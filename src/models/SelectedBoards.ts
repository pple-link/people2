import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { Location, Blood, DonationKind } from "./Enum";
import { CrawlBoard } from "./CrawlBoard";
import { Participation } from "./Participations";
@Entity()
export abstract class SelectedBoard extends BaseBoard {
  @Column({ type: "enum", enum: Location })
  public location!: Location;
  @Column({ type: "text" })
  public hospital!: string;
  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;
  @Column({ type: "enum", enum: DonationKind })
  public doationKind!: DonationKind;

  @OneToMany(
    _ => CrawlBoard,
    crawlBoard => crawlBoard.board
  )
  public crwalBoard?: CrawlBoard[];

  @OneToMany(
    _ => Participation,
    participation => participation.participateUserId
  )
  public participation?: Participation[];
}
