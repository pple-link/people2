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
import { User } from "./Users";

export abstract class Participation extends BaseModel {
  @ManyToOne(
    _ => DirectBoard,
    DirectBoard => DirectBoard.id
  )
  public DirectBoard!: DirectBoard;
  @ManyToOne(
    _ => User,
    user => user.id
  )
  public participateUserId!: User;
}
