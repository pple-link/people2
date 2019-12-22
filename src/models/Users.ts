import { Column, Entity, UpdateDateColumn, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { BaseBoard } from "./BaseBoard";
import { BaseComment } from "./BaseComment";
export enum IsAdmin {
  Admin = "admin",
  Normal = "normal"
}

export enum Blood {
  RHPO = "o+",
  RHPB = "b+",
  RHPA = "a+",
  RHPAB = "ab+",
  RHMO = "o-",
  RHMB = "b-",
  RHMA = "a-",
  RHMAB = "ab-"
}

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
  @Column({ type: "enum", enum: IsAdmin })
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
}
