import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoardComment } from "./NormalBoardComments";
import { User } from "./Users";

@Entity()
export class NormalBoardDepthComment extends BaseComment {
  @ManyToOne(
    _ => NormalBoardComment,
    comment => comment.id
  )
  public refId!: NormalBoardComment;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
