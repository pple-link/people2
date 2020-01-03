import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";

@Entity()
export abstract class DirectBoardDepthComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoardComment,
    comment => comment.id
  )
  public directBoardComment!: DirectBoardComment;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
