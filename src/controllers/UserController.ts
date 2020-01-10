import {
  JsonController,
  Get,
  CurrentUser,
  HeaderParam,
  Post,
  Body
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";
import { User } from "../models";
import { IUserDTO, UserService } from "../services/UserService";

@Service()
@JsonController("/user")
@HeaderParam("authorization")
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  @Get()
  public async getUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Post("/edit")
  public async editUser(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Partial<IUserDTO>
  ) {
    const editUser = await this.userService.createOrUpdate(
      body,
      user.userAccount.id
    );
    return editUser;
  }

  @Post("/delete")
  public async deleteUser(@CurrentUser({ required: true }) user: User) {
    const editUser = await this.userService.createOrUpdate(
      { deletedAt: new Date() },
      user.userAccount.id
    );
    return editUser;
  }
}
