import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoard } from "./NormalBoards";
import { User } from "./Users";
import { NormalBoardDepthComment } from "./NormalBoardDepthComments";

@Entity()
export class NormalBoardComment extends BaseComment {
  @ManyToOne(
    _ => NormalBoard,
    board => board.id
  )
  public normalBoard!: NormalBoard;

  @OneToMany(
    _ => NormalBoardDepthComment,
    comment => comment.ref
  )
  public depthComments!: NormalBoardDepthComment[];

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
