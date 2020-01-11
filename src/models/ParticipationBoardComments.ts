import { Entity, ManyToOne } from "typeorm";
import { BaseComment } from "./BaseComment";
import { ParticipationBoard } from "./ParticipationBoards";
import { User } from "./Users";
import { IsObject } from "class-validator";

@Entity()
export class ParticipationBoardComment extends BaseComment {
  @IsObject()
  @ManyToOne(
    _ => ParticipationBoard,
    board => board.id,
    { nullable: false }
  )
  public participationBoard!: ParticipationBoard;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;
}
