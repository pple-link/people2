import { Entity, OneToMany } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { ParticipationBoardComment } from "./ParticipationBoardComments";
import { Participation } from "./Participations";

@Entity()
export class ParticipationBoard extends BaseBoard {
  @OneToMany(
    _ => Participation,
    user => user.participateUser
  )
  public participationUser!: Participation;
  @OneToMany(
    _ => ParticipationBoardComment,
    comment => comment.participationBoard
  )
  public comments!: ParticipationBoardComment[];
}
