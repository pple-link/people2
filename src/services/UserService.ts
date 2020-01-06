import { Service, Container } from "typedi";
import { User } from "../models";
import { BaseService } from "./BaseService";
import { UserAccountService } from "./UserAccountService";
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
export class UserService extends BaseService<User> {
  constructor(private userAccountService: UserAccountService) {
    super(User);
    this.userAccountService = Container.get(UserAccountService);
  }

  public async getById(userId: number): Promise<User> {
    const relations = [
      //   "directBoards",
      //   "normalBoards",
      //   "participation",
      //   "directBoardComments",
      //   "normalBoardComments",
      "userAccount"
    ];
    return await super.getById(userId, relations);
  }

  public getByClientId(clientId: string): Promise<User> {
    return this.genericRepository.findOne({
      relations: [
        // "directBoard",
        // "normalBoard",
        // "participation",
        // "directBoardComment",
        // "normalBoardComment",
        "userAccount"
      ],
      where: { clientId: clientId }
    }) as Promise<User>;
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
    const tempUser = await this.genericRepository.findOne({
      where: { userAccount: userAccountId }
    });

    if (tempUser) {
      return await this.genericRepository.save({ ...tempUser, ...payload });
    } else {
      const newUser = await this.genericRepository.save(payload);
      await this.userAccountService.update(userAccountId, { user: newUser });
      return newUser;
    }
  }
}
