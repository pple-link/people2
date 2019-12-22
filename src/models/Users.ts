import { Column, Entity, UpdateDateColumn, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { BaseBoard } from "./BaseBoard";
import { BaseComment } from "./BaseComment";
import { IsAdmin, Blood } from "./Enum";
import { Participation } from "./Participations";
@Entity()
export abstract class User extends BaseModel {
  @Column({ length: 45 })
  public nickname!: string; // 닉네임
  @Column({ length: 200 })
  public profile!: string; // 프로필 이미지
  @Column({ length: 25 })
  public phone!: string;
  @Column({ length: 35 })
  public email!: string;
  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;
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
    particiation => particiation.selectedBoard
  )
  public participation1?: Participation[];
}
