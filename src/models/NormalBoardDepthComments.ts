import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoardComment } from "./NormalBoardComments";
import { User } from "./Users";
import { IsObject } from "class-validator";

@Entity()
export class NormalBoardDepthComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    _ => NormalBoardComment,
    comment => comment.id,
    { nullable: false }
  )
  public ref!: NormalBoardComment;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;
}
