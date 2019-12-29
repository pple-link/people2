import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoard } from "./NormalBoards";
import { User } from "./Users";

@Entity()
export abstract class NormalBoardComment extends BaseComment {
  @ManyToOne(
    _ => NormalBoard,
    board => board.id
  )
  public normalBoard!: number;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
