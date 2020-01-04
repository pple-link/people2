import { Entity, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { ParticipationBoardComment } from "./ParticipationBoardComments";
import { Participation } from "./Participations";
import { User } from "./Users";

@Entity()
export class ParticipationBoard extends BaseBoard {
  @OneToOne(
    _ => Participation,
    participation => participation.id
  )
  @JoinColumn()
  public participation!: Participation;

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;

  @OneToMany(
    _ => ParticipationBoardComment,
    comment => comment.participationBoard
  )
  public comments!: ParticipationBoardComment[];
}
