import { BaseModel } from "./BaseModel";
import { User } from "./Users";
import { Column, Entity, OneToOne, Unique, JoinColumn } from "typeorm";
import { Provider } from "./Enum";
@Entity()
@Unique(["clientId", "user"])
export class UserAccount extends BaseModel {
  @Column({ type: "enum", enum: Provider })
  public provider!: Provider;

  @Column({ length: 50 })
  public clientId!: string;

  @OneToOne(
    _ => User,
    user => user.userAccount,
    { nullable: false }
  )
  @JoinColumn()
  public user?: User;
}
