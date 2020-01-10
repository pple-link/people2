import { Column, Entity, OneToMany, Unique, OneToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";
import { DirectBoardComment } from "./DirectBoardComments";
import { NormalBoard } from "./NormalBoards";
import { NormalBoardComment } from "./NormalBoardComments";
import { IsAdmin, Blood, Sex, Job } from "./Enum";
import { Participation } from "./Participations";
import { UserAccount } from "./UserAccounts";
import { NormalBoardDepthComment } from "./NormalBoardDepthComments";
import { DirectBoardDepthComment } from "./DirectBoardDepthComments";
import { ParticipationBoard } from "./ParticipationBoards";
import { ParticipationBoardComment } from "./ParticipationBoardComments";
import {
  IsInt,
  IsString,
  IsDate,
  IsUrl,
  IsPhoneNumber,
  IsEmail,
  IsEnum,
  IsNumber
} from "class-validator";

@Entity()
@Unique(["nickname", "phone", "email"])
export class User extends BaseModel {
  @Column({ length: 45 })
  @IsInt()
  public nickname!: string; // 닉네임

  @Column({ length: 10 })
  @IsString()
  public name!: string;

  @Column({ type: "date" })
  @IsDate()
  public birthday!: Date;

  @Column({ length: 200 })
  @IsUrl()
  public profile!: string; // 프로필 이미지

  @Column({ length: 25 })
  @IsPhoneNumber("KR")
  public phone!: string;

  @Column({ length: 35 })
  @IsEmail()
  public email!: string;

  @Column({ type: "enum", enum: Sex })
  @IsEnum(Sex)
  public sex!: Sex;

  @Column({ type: "enum", enum: Blood })
  @IsEnum(Blood)
  public blood!: Blood;

  @Column({ type: "enum", enum: Job })
  @IsEnum(Job)
  public job!: Job;

  @Column({ type: "text" })
  @IsString()
  public inflow!: string;

  @Column({ type: "enum", enum: IsAdmin, default: IsAdmin.NORMAL })
  @IsEnum(IsAdmin)
  public isAdmin!: IsAdmin;

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  @IsDate()
  public lastLoginDate!: Date;

  @OneToMany(
    _ => DirectBoard,
    board => board.user
  )
  public directBoards!: DirectBoard[];

  @OneToMany(
    _ => NormalBoard,
    board => board.user
  )
  public normalBoards!: NormalBoard[];

  @OneToMany(
    _ => DirectBoardComment,
    comment => comment.user
  )
  public directBoardComments!: DirectBoardComment[];

  @OneToMany(
    _ => DirectBoardDepthComment,
    comment => comment.user
  )
  public directBoardDepthComments!: DirectBoardDepthComment[];

  @OneToMany(
    _ => NormalBoardComment,
    comment => comment.user
  )
  public normalBoardComments!: NormalBoardComment[];

  @OneToMany(
    _ => NormalBoardDepthComment,
    comment => comment.user
  )
  public normalBoardDepthComments!: NormalBoardDepthComment[];

  @OneToMany(
    _ => Participation,
    particiation => particiation.participateUser
  )
  public participations!: Participation[];

  @OneToMany(
    _ => ParticipationBoard,
    participationBoard => participationBoard.user
  )
  public participationBoards!: ParticipationBoard[];

  @OneToMany(
    _ => ParticipationBoardComment,
    participationBoardComment => participationBoardComment.user
  )
  public participationBoardComments!: ParticipationBoardComment[];

  @OneToOne(
    _ => UserAccount,
    userAccount => userAccount.user
  )
  public userAccount!: UserAccount;

  @Column({ nullable: true, type: "date", default: null })
  public deletedAt?: Date | null;

  @Column({ default: 0 })
  @IsNumber()
  public level!: number;
}
