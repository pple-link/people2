import jsonwebtoken, { SignOptions } from "jsonwebtoken";
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

  public static verifyToekn(token: string): IToken {
    const data: IToken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || "",
      { algorithms: ["HS512"] }
    ) as IToken;
    return data;
  }
}
