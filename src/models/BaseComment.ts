import { Column } from "typeorm";
import { BaseModel } from "./BaseModel";

export abstract class BaseComment extends BaseModel {
  @Column({ length: 50 })
  public comment!: string;

  @Column({ default: 0 })
  public reportCount!: number;
}
