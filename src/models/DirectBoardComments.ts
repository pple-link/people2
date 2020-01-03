import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";

@Entity()
export class DirectBoardComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public directBoard!: DirectBoard;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
