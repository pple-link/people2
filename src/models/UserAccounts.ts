import { BaseModel } from "./BaseModel";
import { User } from "./Users";
import { Column, Entity, OneToOne, Unique, JoinColumn } from "typeorm";
import { Provider } from "./Enum";
import { IsEnum, IsString, IsObject } from "class-validator";
@Entity()
@Unique(["clientId", "user"])
export class UserAccount extends BaseModel {
  @IsEnum(Provider)
  @Column({ type: "enum", enum: Provider })
  public provider!: Provider;

  @IsString()
  @Column({ length: 50 })
  public clientId!: string;

  @IsObject()
  @OneToOne(
    _ => User,
    user => user.userAccount,
    { nullable: true }
  )
  @JoinColumn()
  public user?: User;
}
