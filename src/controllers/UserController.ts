import {
  JsonController,
  Get,
  CurrentUser,
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
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/user")
@UseInterceptor(ResponseJosnInterceptor)
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  @HttpCode(200)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  public async getUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Put()
  @HttpCode(201)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
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
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @HttpCode(204)
  public async deleteUser(@CurrentUser({ required: true }) user: User) {
    const editUser = await this.userService.createOrUpdate(
      { deletedAt: new Date() },
      user.userAccount.clientId
    );
    return editUser;
  }
}
