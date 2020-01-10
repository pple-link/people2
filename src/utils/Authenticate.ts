import jsonwebtoken from "jsonwebtoken";
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

  public static verifyToekn(token: string): Boolean {
    const data: IToken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || "",
      { algorithms: ["HS512"] }
    ) as IToken;

    if (data.iat * 1000 - new Date().getTime() > 0) return false;
    else if (data.exp * 1000 - new Date().getTime() <= 0) return false;
    else return true;
  }

  public static getUserIdByToken(token: string): Pick<IToken, "userId"> {
    return jsonwebtoken.verify(token, process.env.CRYPTO_SECRETKEY || "", {
      algorithms: ["HS512"]
    }) as Pick<IToken, "userId">;
  }
}
