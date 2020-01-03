import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { ParticipationBoard } from "./ParticipationBoards";
import { User } from "./Users";

@Entity()
export class ParticipationBoardComment extends BaseComment {
  @ManyToOne(
    _ => ParticipationBoard,
    board => board.id
  )
  public participationBoard!: ParticipationBoard;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
