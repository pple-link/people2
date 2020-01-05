import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";

@Entity()
export class DirectBoardDepthComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoardComment,
    comment => comment.id
  )
  public refId!: DirectBoardComment;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
