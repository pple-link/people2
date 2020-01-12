import {
  JsonController,
  Get,
  CurrentUser,
  HeaderParam,
  Body,
  Delete,
  Put
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import { User } from "../models";
import { IUserDTO, UserService } from "../services/UserService";

@Service()
@JsonController("/user")
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  @HeaderParam("authorization")
  public async getUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Put()
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
  @HeaderParam("authorization")
  public async deleteUser(@CurrentUser({ required: true }) user: User) {
    const editUser = await this.userService.createOrUpdate(
      { deletedAt: new Date() },
      user.userAccount.clientId
    );
    return editUser;
  }
}
