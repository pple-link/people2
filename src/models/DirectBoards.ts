import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { Location, Blood, DonationKind } from "./Enum";
import { CrawlLog } from "./CrawlLogs";
import { Participation } from "./Participations";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";

export const donationKindTransformer = {
  to: (value: string[]): string =>
    "[" + value.filter(role => role).join(",") + "]",
  from: (value: string): string[] =>
    value
      .replace(/\[|\]/g, "")
      .split(",")
      .filter(role => role)
};

@Entity()
export abstract class DirectBoard extends BaseBoard {
  @Column({ type: "enum", enum: Location })
  public location!: Location;
  @Column({ type: "text" })
  public hospital!: string;
  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;
  @Column("enum", {
    enum: DonationKind,
    array: true,
    transformer: donationKindTransformer
  })
  public doationKinds!: DonationKind[];

  @ManyToOne(
    _ => User,
    user => user.id
  )
  public user!: User;

  @OneToMany(
    _ => CrawlLog,
    crawlLog => crawlLog.directBoard
  )
  public crwalLog!: CrawlLog[];

  @OneToMany(
    _ => Participation,
    participation => participation.participateUser
  )
  public participation!: Participation[];

  @OneToMany(
    _ => DirectBoardComment,
    comment => comment.id
  )
  public comments!: DirectBoardComment[];
}
