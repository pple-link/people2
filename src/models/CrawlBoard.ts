import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { SelectedBoard } from "./SelectedBoards";

export abstract class CrawlBoard extends BaseModel {
  @Column({ type: "text" })
  public log!: string;

  @ManyToOne(
    _ => SelectedBoard,
    board => board.id
  )
  public board!: SelectedBoard;
}
