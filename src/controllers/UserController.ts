import {
  JsonController,
  Get,
  CurrentUser,
  HeaderParam,
  Body,
  Delete,
  Put,
  UseInterceptor,
  HttpCode
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { User } from "../models";
import { IUserDTO, UserService } from "../services/UserService";
import { ResponseJosnInterceptor } from "../interceptors/ResponseJsonInterceptor";

@JsonController("/user")
@UseInterceptor(ResponseJosnInterceptor)
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  @HttpCode(200)
  @HeaderParam("authorization")
  public async getUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Put()
  @HttpCode(201)
  @HeaderParam("authorization")
  public async editUser(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Partial<IUserDTO>
  ) {
    const editUser = await this.userService.createOrUpdate(
      body,
      user.userAccount.clientId
    );
    return editUser;
  }

  @Delete()
  @HttpCode(204)
  @HeaderParam("authorization")
  public async deleteUser(@CurrentUser({ required: true }) user: User) {
    const editUser = await this.userService.createOrUpdate(
      { deletedAt: new Date() },
      user.userAccount.clientId
    );
    return editUser;
  }
}
