import { Column } from "typeorm";
import { BaseModel } from "./BaseModel";
import { IsString, MaxLength, IsInt } from "class-validator";

export abstract class BaseComment extends BaseModel {
  @Column({ length: 50 })
  @IsString()
  @MaxLength(50)
  public comment!: string;

  @Column({ default: 0 })
  @IsInt()
  public reportCount!: number;
}
