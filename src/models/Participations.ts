import { ManyToOne, Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { DirectBoard } from "./DirectBoards";
import { User } from "./Users";
import { IsObject } from "class-validator";
import { ParticipationBoard } from "./ParticipationBoards";

@Entity()
export class Participation extends BaseModel {
  @IsObject()
  @ManyToOne(
    _ => DirectBoard,
    DirectBoard => DirectBoard.id,
    { nullable: false }
  )
  public directBoard!: DirectBoard;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public participateUser!: User;

  @IsObject()
  @OneToOne(
    _ => ParticipationBoard,
    board => board.id,
    { nullable: true }
  )
  @JoinColumn()
  public participationBoard!: ParticipationBoard;
}
