import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoard } from "./NormalBoards";
import { User } from "./Users";
import { NormalBoardDepthComment } from "./NormalBoardDepthComments";
import { IsObject } from "class-validator";

@Entity()
export class NormalBoardComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    _ => NormalBoard,
    board => board.id,
    { nullable: false }
  )
  public normalBoard!: NormalBoard;

  @OneToMany(
    _ => NormalBoardDepthComment,
    comment => comment.ref
  )
  public depthComments!: NormalBoardDepthComment[];

  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  @IsObject()
  public user!: User;
}
