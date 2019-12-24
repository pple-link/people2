import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { NormalBoard } from "./NormalBoards";

@Entity()
export abstract class NormalBoardComment extends BaseComment {
  @ManyToOne(
    _ => NormalBoard,
    board => board.id
  )
  public board!: number;
}
