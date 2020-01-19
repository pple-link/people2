import { Sex, Blood, Job } from "../models/Enum";
import { IsString, IsDate, IsEnum } from "class-validator";

export class IUserDTOCLass {
  @IsString()
  public nickname: string;
  @IsString()
  public name: string;
  @IsDate()
  public birthday: Date;
  @IsString()
  public profile: string;
  @IsString()
  public phone: string;
  @IsString()
  public email: string;
  @IsEnum(Sex)
  public sex: Sex;
  @IsEnum(Blood)
  public blood: Blood;
  @IsEnum(Job)
  public job: Job;
  @IsString()
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
