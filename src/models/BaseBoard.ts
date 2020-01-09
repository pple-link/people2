import { Column } from "typeorm";
import { BaseModel } from "./BaseModel";
import { ShowFlag } from "./Enum";
import { IsString, IsEnum, IsInt } from "class-validator";

export abstract class BaseBoard extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  public title!: string;
  @IsString()
  @Column({ type: "text" })
  public content!: string;
  @IsEnum(ShowFlag)
  @Column({ type: "enum", enum: ShowFlag, default: ShowFlag.PENDING })
  public showFlag!: ShowFlag;
  @IsInt()
  @Column({ default: 0 })
  public reportCount!: number;
  @Column({ nullable: true, type: "date", default: null })
  public deletedAt?: Date | null;
}
