import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { Location, Blood, DonationKind } from "./Enum";
import { CrawlLog } from "./CrawlLogs";
import { Participation } from "./Participations";
import { DirectBoardComment } from "./DirectBoardComments";
@Entity()
export abstract class DirectBoard extends BaseBoard {
  @Column({ type: "enum", enum: Location })
  public location!: Location;
  @Column({ type: "text" })
  public hospital!: string;
  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;
  @Column({ type: "enum", enum: DonationKind })
  public doationKind!: DonationKind;

  @OneToMany(
    _ => CrawlLog,
    crawlLog => crawlLog.board
  )
  public crwalLog?: CrawlLog[];

  @OneToMany(
    _ => Participation,
    participation => participation.participateUserId
  )
  public participation?: Participation[];

  @OneToMany(
    _ => DirectBoardComment,
    comment => comment.id
  )
  public comments?: DirectBoardComment[];
}
