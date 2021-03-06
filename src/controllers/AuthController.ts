import {
  JsonController,
  Get,
  QueryParam,
  Post,
  Body
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { UserAccountService, UserService } from "../services";
import { KaKaoProvider } from "../providers/KakaoProvider";
import { Provider, IsAdmin } from "../models/Enum";
import { IUserDTO } from "../services/UserService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { User } from "../models";

export interface ILoginResponse {
  result: Boolean;
  jwt: string;
}

@JsonController("/auth")
export class AuthController extends BaseController {
  constructor(
    private userAccountService: UserAccountService,
    private userService: UserService,
    private kakaoProvider: KaKaoProvider
  ) {
    super();
  }

  @Get("/kakao/login")
  @OpenAPI({
    summary: "login with access_token",
    description:
      "return { result: true, jwt: jwt } or { result: false, jwt: '' } "
  })
  public async getuserAccount(
    @QueryParam("access_token") accessToken: string
  ): Promise<ILoginResponse> {
    const clientId = await this.kakaoProvider.getClient_id(accessToken);
    const userAccount = await this.userAccountService.getOrNewAccount({
      provider: Provider["KAKAO"],
      clientId: clientId
    });
    if (userAccount.user == null) return { result: false, jwt: "" };
    else {
      const jwt = await this.kakaoProvider.generateToken(userAccount.user.id);
      return { result: true, jwt: jwt };
    }
  }

  @Post("/kakao/register")
  @OpenAPI({
    summary: "login with access_token",
    description:
      "Body{ \n  nickname: string;\nname: string;\nbirthday: Date;\nprofile: string;\nphone: string;\nemail: string;\nsex: Sex;\nblood: Blood;\njob: Job;\ninflow: string; access_token: string;}"
  })
  @ResponseSchema(User, {
    description: "register",
    isArray: false,
    statusCode: "201"
  })
  public async getKakaoAuthToken(
    @Body()
    body: Pick<
      IUserDTO,
      | "nickname"
      | "name"
      | "birthday"
      | "profile"
      | "phone"
      | "email"
      | "sex"
      | "blood"
      | "job"
      | "inflow"
    > &
      Pick<any, "access_token">
  ) {
    const clientId = await this.kakaoProvider.getClient_id(body.access_token);
    const user = await this.userService.createOrUpdate(
      {
        nickname: body.nickname,
        name: body.name,
        birthday: body.birthday,
        profile: body.profile,
        phone: body.phone,
        email: body.email,
        sex: body.sex,
        blood: body.blood,
        job: body.job,
        inflow: body.inflow,
        isAdmin: IsAdmin["NORMAL"]
      },
      clientId
    );
    const jwt = await this.kakaoProvider.generateToken(user.id);
    return { result: true, jwt: jwt, user: user };
  }
}
