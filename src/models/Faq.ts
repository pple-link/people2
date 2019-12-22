import { Entity } from "typeorm";
import { BaseBoard } from "./BaseBoard";

@Entity()
export abstract class Faq extends BaseBoard {}
