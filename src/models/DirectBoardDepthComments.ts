import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";

@Entity()
export class DirectBoardDepthComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoardComment,
    comment => comment.id,
    { nullable: false }
  )
  public ref!: DirectBoardComment;

  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;
}
