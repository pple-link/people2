import { Column, ManyToOne, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";

@Entity()
export class CrawlLog extends BaseModel {
  @Column({ type: "text" })
  public log!: string;

  @ManyToOne(
    _ => DirectBoard,
    board => board.id
  )
  public directBoard!: DirectBoard;
}
