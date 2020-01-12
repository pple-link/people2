import { Entity, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { ParticipationBoardComment } from "./ParticipationBoardComments";
import { Participation } from "./Participations";
import { User } from "./Users";
import { IsObject } from "class-validator";

@Entity()
export class ParticipationBoard extends BaseBoard {
  @IsObject()
  @OneToOne(
    _ => Participation,
    participation => participation.id
  )
  public participation!: Participation;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;

  @OneToMany(
    _ => ParticipationBoardComment,
    comment => comment.participationBoard
  )
  public comments!: ParticipationBoardComment[];
}
