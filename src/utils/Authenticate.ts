import jsonwebtoken from "jsonwebtoken";
import { Action } from "routing-controllers";
import Container from "typedi";
import { UserService } from "../services";
export interface IToken {
  userId: number;
  iat: number;
  exp: number;
}
export class Authentication {
  public static isToken(token: string) {
    return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
      token
    );
  }

  public static generateToken(userId: number): string {
    return jsonwebtoken.sign(
      { userId: userId },
      process.env.CRYPTO_SECRETKEY || "",
      { algorithm: "HS512", expiresIn: "1d" }
    );
  }

  public static verifyToken(token: string): Boolean {
    const data: IToken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || "",
      { algorithms: ["HS512"] }
    ) as IToken;

    if (data.iat * 1000 - new Date().getTime() > 0) return false;
    else if (data.exp * 1000 - new Date().getTime() <= 0) return false;
    else return true;
  }

  public static refreshToken(token: string): string {
    const data: IToken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || "",
      { algorithms: ["HS512"] }
    ) as IToken;
    if (data.exp - new Date().getTime() / 1000 < 60 * 60) {
      return Authentication.generateToken(data.userId);
    } else {
      return token;
    }
  }

  public static getUserIdByToken(token: string): Pick<IToken, "userId"> {
    return jsonwebtoken.verify(token, process.env.CRYPTO_SECRETKEY || "", {
      algorithms: ["HS512"]
    }) as Pick<IToken, "userId">;
  }

  public static async currentUserChecker(action: Action) {
    const bearerToken = action.request.headers.authorization;
    if (!Authentication.isToken(bearerToken)) {
      return false;
    }
    const token = bearerToken.replace(/Bearer\s/, "");
    if (!Authentication.verifyToken(token)) {
      return false;
    }
    const userService = Container.get(UserService);
    const user = await userService.getById(
      Authentication.getUserIdByToken(token).userId
    );
    return user;
  }
}
