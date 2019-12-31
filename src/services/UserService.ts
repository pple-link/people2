import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
import { User } from "../models/Users";
import { UserAccount } from "../models/UserAccounts";
import { BaseService } from "./BaseService";
import { IsAdmin, Provider, Sex, Blood, Job } from "../models/Enum";
export interface IUserAccountDTO {
  provider: Provider;
  clientId: string;
}

export interface IUserDTO {
  nickname: string;
  name: string;
  birthday: Date;
  provider: Provider;
  profile: string;
  phone: string;
  email: string;
  sex: Sex;
  blood: Blood;
  job: Job;
  inflow: string;
  lastLoginDate: Date;
  isAdmin: IsAdmin;
}

@Service()
export class UserService extends BaseService {
  private userAccountRepository: Repository<UserAccount>;
  private userRepository: Repository<User>;
  constructor() {
    super();
    this.userAccountRepository = getConnection().getRepository(UserAccount);
    this.userRepository = getConnection().getRepository(User);
  }

  public async getOrNewAccount(
    tempUser: IUserAccountDTO
  ): Promise<UserAccount> {
    const user = await this.userAccountRepository.findOne({
      where: { provider: tempUser.provider, clientId: tempUser.clientId },
      relations: ["user"]
    });

    if (user) {
      return user;
    }
    return getConnection()
      .getRepository(UserAccount)
      .save({
        provider: tempUser.provider,
        clientId: tempUser.clientId
      });
  }

  public getById(userId: number) {
    return getConnection()
      .getRepository(User)
      .findOne({
        relations: [
          //   "directBoards",
          //   "normalBoards",
          //   "participation",
          //   "directBoardComments",
          //   "normalBoardComments",
          "userAccount"
        ],
        where: { id: userId }
      });
  }

  public getByClientId(clientId: string) {
    return getConnection()
      .getRepository(User)
      .findOne({
        relations: [
          // "directBoard",
          // "normalBoard",
          // "participation",
          // "directBoardComment",
          // "normalBoardComment",
          "userAccount"
        ],
        where: { clientId: clientId }
      });
  }

  public async createOrUpdate(
    user: Partial<IUserDTO>,
    userAccountId: number
  ): Promise<User> {
    const payload: Partial<User> = {};
    if (user.nickname) {
      payload.nickname = user.nickname;
    }
    if (user.name) {
      payload.name = user.name;
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
    const tempUser = await this.userRepository.findOne({
      where: { userAccount: userAccountId }
    });

    if (tempUser) {
      return await this.userRepository.save({ ...tempUser, ...payload });
    } else {
      const newUser = await this.userRepository.save(payload);
      await this.userAccountRepository.update(userAccountId, { user: newUser });
      return newUser;
    }
  }
}
