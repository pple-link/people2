import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./Users";

@Entity()
export class APILog extends BaseModel {
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
