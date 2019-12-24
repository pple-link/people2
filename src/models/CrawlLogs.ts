import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";

export abstract class CrawlLog extends BaseModel {
  @Column({ type: "text" })
  public log!: string;

  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public board!: DirectBoard;
}
