import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";

@Entity()
export abstract class DirectBoardComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public directBoard!: number;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
