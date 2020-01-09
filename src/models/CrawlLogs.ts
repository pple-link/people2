import { Column, ManyToOne, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";
import { IsString, IsObject } from "class-validator";

@Entity()
export class CrawlLog extends BaseModel {
  @IsString()
  @Column({ type: "text" })
  public log!: string;

  @IsObject()
  @ManyToOne(
    _ => DirectBoard,
    board => board.id,
    { nullable: false }
  )
  public directBoard!: DirectBoard;
}
