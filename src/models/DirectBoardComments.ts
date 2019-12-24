import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { DirectBoard } from "./DirectBoards";

@Entity()
export abstract class DirectBoardComment extends BaseComment {
  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public board!: number;
}
