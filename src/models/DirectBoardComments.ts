import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";
import { DirectBoardDepthComment } from "./DirectBoardDepthComments";
import { IsObject } from "class-validator";

@Entity()
export class DirectBoardComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    _ => DirectBoard,
    board => board.id,
    { nullable: false }
  )
  public directBoard!: DirectBoard;

  @OneToMany(
    _ => DirectBoardDepthComment,
    comment => comment.ref
  )
  public depthComments!: DirectBoardDepthComment[];

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;
}
