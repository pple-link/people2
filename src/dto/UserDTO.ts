import { Sex, Blood, Job } from "../models/Enum";

export class IUserDTOCLass {
  public nickname: string;
  public name: string;
  public birthday: Date;
  public profile: string;
  public phone: string;
  public email: string;
  public sex: Sex;
  public blood: Blood;
  public job: Job;
  public inflow: string;

  constructor() {
    this.nickname = "";
    this.name = "";
    this.birthday = new Date();
    this.profile = "";
    this.phone = "";
    this.email = "";
    this.sex = Sex["MALE"];
    this.blood = Blood["RHMA"];
    this.job = Job["BLUE"];
    this.inflow = "";
  }
}
