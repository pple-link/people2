import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
import { User } from "../models/Users";
import { BaseService } from "./BaseService";
import { IsAdmin, Provider } from "../models/Enum";
export interface ITempUserDTO {
  name: string;
  provider: Provider;
  isAdmin: IsAdmin;
  profile?: string;
  email?: string;
  clientId: string;
  lastLoginDate: Date;
}

@Service()
export class UserService extends BaseService {
  private userRepository: Repository<User>;
  constructor() {
    super();
    this.userRepository = getConnection().getRepository(User);
  }

  public async getOrNew(tempUser: ITempUserDTO) {
    const user = await this.userRepository.findOne({
      where: { provider: tempUser.provider, clientId: tempUser.clientId }
    });

    if (user) {
      return user;
    }
    return getConnection()
      .getRepository(User)
      .save({
        nickname: "",
        name: tempUser.name,
        email: tempUser.email || "",
        provider: tempUser.provider,
        clientId: tempUser.clientId
      });
  }

  public getById(userId: number) {
    return getConnection()
      .getRepository(User)
      .findOne({
        relations: [
          "directBoard",
          "normalBoard",
          "participation",
          "directBoardComment",
          "normalBoardComment"
        ],
        where: { id: userId }
      });
  }

  public async updateUser(userId: number, user: Partial<User>) {
    const payload: Partial<User> = {};
    if (user.nickname) {
      payload.nickname = user.nickname;
    }
    if (user.birthday) {
      payload.birthday = user.birthday;
    }
    if (user.profile) {
      payload.profile = user.profile;
    }
    if (user.phone) {
      payload.phone = user.phone;
    }
    if (user.email) {
      payload.email = user.email;
    }
    if (user.sex) {
      payload.sex = user.sex;
    }
    if (user.blood) {
      payload.blood = user.blood;
    }
    if (user.job) {
      payload.job = user.job;
    }
    if (user.inflow) {
      payload.inflow = user.inflow;
    }
    if (user.isAdmin) {
      payload.isAdmin = user.isAdmin;
    }
    return this.userRepository.update(userId, payload);
  }
}
