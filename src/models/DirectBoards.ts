import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";
import { Location, Blood } from "./Enum";
import { CrawlLog } from "./CrawlLogs";
import { Participation } from "./Participations";
import { DirectBoardComment } from "./DirectBoardComments";
import { User } from "./Users";
import { IsEnum, IsString, IsObject } from "class-validator";

@Entity()
export class DirectBoard extends BaseBoard {
  @IsEnum(Location)
  @Column({ type: "enum", enum: Location })
  public location!: Location;
  @IsString()
  @Column({ type: "text" })
  public hospital!: string;
  @IsEnum(Blood)
  @Column({ type: "enum", enum: Blood })
  public blood!: Blood;
  @IsString()
  @Column({
    type: "text"
  })
  public donationKinds!: string;

  @IsObject()
  @ManyToOne(
    _ => User,
    user => user.id,
    { nullable: false }
  )
  public user!: User;

  @OneToMany(
    _ => CrawlLog,
    crawlLog => crawlLog.directBoard
  )
  public crawlLog!: CrawlLog[];

  @OneToMany(
    _ => Participation,
    participation => participation.participateUser
  )
  public participation!: Participation[];

  @OneToMany(
    _ => DirectBoardComment,
    comment => comment.directBoard
  )
  public comments!: DirectBoardComment[];
}
