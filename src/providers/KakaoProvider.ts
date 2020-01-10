import { BaseProvider } from "./BaseProvider";
// import { UserService } from "../services";
// import { Container } from "typedi";
import { Authentication } from "../utils/Authenticate";
import { Service } from "typedi";

export interface KaKaoResponse {
  snsId: number;
}

@Service()
export class KaKaoProvider extends BaseProvider {
  constructor() {
    super();
  }

  public async getClient_id(accessToken: string) {
    this.setInstance("https://kapi.kakao.com", {
      Authorization: `Bearer ${accessToken}`
    });
    const response = await this.getInstance()?.get(
      "/v1/user/access_token_info"
    );

    return response?.data.id;
  }

  public async generateToken(userId: number) {
    return `Bearer ${Authentication.generateToken(userId)}`;
  }
}
