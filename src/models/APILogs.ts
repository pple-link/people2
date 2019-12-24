import { Column, ManyToOne, CreateDateColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./Users";

export abstract class CrawlLog extends BaseModel {
  @Column({ type: "text" })
  public log!: string;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;

  @Column()
  public responseTime!: number;
}
