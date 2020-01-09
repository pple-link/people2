import { Entity, OneToMany, ManyToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { NormalBoardComment } from "./NormalBoardComments";
import { User } from "./Users";

@Entity()
export class NormalBoard extends BaseBoard {
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;
  @OneToMany(
    _ => NormalBoardComment,
    comment => comment.normalBoard
  )
  public comments!: NormalBoardComment[];
}
