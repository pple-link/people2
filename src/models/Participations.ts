import { ManyToOne, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";

@Entity()
export class Participation extends BaseModel {
  @ManyToOne(
    _ => DirectBoard,
    DirectBoard => DirectBoard.id
  )
  public directBoard!: DirectBoard;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public participateUser!: User;
}
