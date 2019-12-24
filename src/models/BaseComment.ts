import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./Users";

@Entity()
export abstract class BaseComment extends BaseModel {
  @Column({ length: 50 })
  public comment!: string;

  @ManyToOne(
    _ => User,
    user => user.comments
  )
  public author!: User;

  @Column({ default: 0 })
  public reportCount!: number;
}
