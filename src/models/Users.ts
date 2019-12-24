import { Column, Entity, UpdateDateColumn, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { BaseBoard } from "./BaseBoard";
import { BaseComment } from "./BaseComment";
import { IsAdmin, Blood, Sex, Job } from "./Enum";
import { Participation } from "./Participations";
@Entity()
export abstract class User extends BaseModel {
  @Column({ length: 45 })
  public nickname!: string; // 닉네임

  @Column({ length: 10 })
  public name!: string;

  @Column({ type: "datetime" })
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

  @UpdateDateColumn()
  public lastLoginDate!: Date;

  @OneToMany(
    _ => BaseBoard,
    board => board.author
  )
  public boards?: BaseBoard[];

  @OneToMany(
    _ => BaseComment,
    comment => comment.author
  )
  public comments?: BaseComment[];

  @OneToMany(
    _ => Participation,
    particiation => particiation.DirectBoard
  )
  public participation1?: Participation[];
}
