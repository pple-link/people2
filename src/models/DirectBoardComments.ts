import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";
import { DirectBoardDepthComment } from "./DirectBoardDepthComments";

@Entity()
export class DirectBoardComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public directBoard!: DirectBoard;

  @OneToMany(
    _ => DirectBoardDepthComment,
    comment => comment.ref
  )
  public depthComments!: DirectBoardDepthComment[];

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
