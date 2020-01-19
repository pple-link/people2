import { IsString, IsEnum } from "class-validator";
import { IBoardDTO } from "../services/BaseBoardService";

import { Location, DonationKind, Blood } from "../models/Enum";
export class IBoardDTOClass implements Pick<IBoardDTO, "title" | "content"> {
  @IsString()
  public title: string;
  @IsString()
  public content: string;

  constructor() {
    this.title = "";
    this.content = "";
  }
}

export class IDirectBoardDTOClass {
  @IsString()
  public title: string;
  @IsString()
  public content: string;
  @IsEnum(Location)
  public location: Location;
  @IsString()
  public hospital: string;
  @IsEnum(Blood)
  public blood: Blood;
  @IsEnum(DonationKind)
  public donationKinds: DonationKind;

  constructor() {
    this.title = "";
    this.content = "";
    this.location = Location.SEOUL;
    this.hospital = "";
    this.donationKinds = DonationKind.ALL;
    this.blood = Blood.RHMA;
  }
}
