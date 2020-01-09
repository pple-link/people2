import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./Users";
import { IsString, IsObject, IsInt } from "class-validator";

@Entity()
export class APILog extends BaseModel {
  @IsString()
  @Column({ type: "text" })
  public log!: string;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;

  @IsInt()
  @Column()
  public responseTime!: number;
}
