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
import { ShowFlag } from "./Enum";

@Entity()
export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  public title!: string;
  @Column({ type: "text" })
  public content!: string;
  @Column({ type: "enum", enum: ShowFlag, default: ShowFlag.PENDING })
  public showFlag!: ShowFlag;
  @Column({ default: 0 })
  public reportCount!: number;
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
