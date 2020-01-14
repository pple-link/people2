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
  profile: string;
  phone: string;
  email: string;
  sex: Sex;
  blood: Blood;
  job: Job;
  inflow: string;
  lastLoginDate: Date;
  isAdmin: IsAdmin;
  deletedAt?: Date;
}

@Service()
export class UserService extends BaseService<User> {
  constructor(private userAccountService: UserAccountService) {
    super(User);
    this.userAccountService = Container.get(UserAccountService);
  }

  public async getById(userId: number): Promise<User> {
    const relations = [
      "directBoards",
      "normalBoards",
      "participations",
      "participations.directBoard",
      "participationBoards",
      "userAccount"
    ];
    return await super.getById(userId, relations);
  }

  public async createOrUpdate(
    user: Partial<IUserDTO>,
    clientId: string
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

    if (user.deletedAt) {
      payload.deletedAt = user.deletedAt;
    }
    const tempAccount = await this.userAccountService.getByClientId(clientId);
    if (tempAccount.user) {
      return await this.genericRepository.save({
        ...tempAccount.user,
        ...payload
      });
    } else {
      const newUser = await this.genericRepository.save(payload);
      await this.userAccountService.update(tempAccount.id, newUser);
      return newUser;
    }
  }
}
