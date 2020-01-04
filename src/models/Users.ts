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

@Entity()
@Unique(["nickname", "phone", "email"])
export class User extends BaseModel {
  @Column({ length: 45 })
  public nickname!: string; // 닉네임

  @Column({ length: 10 })
  public name!: string;

  @Column({ type: "date" })
  public birthday!: Date;

  @Column({ length: 200 })
  public profile!: string; // 프로필 이미지

  @Column({ length: 25 })
  public phone!: string;

  @Column({ length: 35 })
  public email!: string;

  @Column({ type: "enum", enum: Sex })
  public sex!: Sex;

  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;

  @Column({ type: "enum", enum: Job })
  public job!: Job;

  @Column({ type: "text" })
  public inflow!: string;

  @Column({ type: "enum", enum: IsAdmin, default: IsAdmin.NORMAL })
  public isAdmin!: IsAdmin;

  @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
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
    particiation => particiation.DirectBoard
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
}
