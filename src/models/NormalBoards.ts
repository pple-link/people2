import { Entity, OneToMany, ManyToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { NormalBoardComment } from "./NormalBoardComments";
import { User } from "./Users";
import { IsObject } from "class-validator";

@Entity()
export class NormalBoard extends BaseBoard {
  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;

  @IsObject()
  @OneToMany(
    _ => NormalBoardComment,
    comment => comment.normalBoard
  )
  public comments!: NormalBoardComment[];
}
