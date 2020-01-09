import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";
import { IsObject } from "class-validator";

@Entity()
export class DirectBoardDepthComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    _ => DirectBoardComment,
    comment => comment.id,
    { nullable: false }
  )
  public ref!: DirectBoardComment;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;
}
