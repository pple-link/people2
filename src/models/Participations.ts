import { ManyToOne, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";

@Entity()
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
  public participateUser!: User;
}
