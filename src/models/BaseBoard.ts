import { Column } from "typeorm";
import { BaseModel } from "./BaseModel";
import { ShowFlag } from "./Enum";

export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  public title!: string;
  @Column({ type: "text" })
  public content!: string;
  @Column({ type: "enum", enum: ShowFlag, default: ShowFlag.PENDING })
  public showFlag!: ShowFlag;
  @Column({ default: 0 })
  public reportCount!: number;
  @Column({ nullable: true, type: "date", default: null })
  public deletedAt?: Date | null;
}
