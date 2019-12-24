import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { NormalBoardComment } from "./NormalBoardComments";

@Entity()
export abstract class NormalBoard extends BaseBoard {
  @OneToMany(
    _ => NormalBoardComment,
    comment => comment.board
  )
  public comments?: NormalBoardComment[];
}
