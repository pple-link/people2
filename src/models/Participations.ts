import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne
} from "typeorm";
import { BaseModel } from "./BaseModel";
import { SelectedBoard } from "./SelectedBoards";
import { User } from "./Users";

export abstract class Participation extends BaseModel {
  @ManyToOne(
    _ => SelectedBoard,
    selectedBoard => selectedBoard.id
  )
  public selectedBoard!: SelectedBoard;
  @ManyToOne(
    _ => User,
    user => user.id
  )
  public participateUserId!: User;
}
