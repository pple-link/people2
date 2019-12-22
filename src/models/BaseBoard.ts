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
import { BaseComment } from "./BaseComment";

@Entity()
export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  public title!: string;
  @Column({ type: "text" })
  public content!: string;
  @ManyToOne(
    _ => User,
    user => user.boards
  )
  public author!: User;
  @OneToMany(
    _ => BaseComment,
    comment => comment.board
  )
  public comments?: BaseComment[];
}
