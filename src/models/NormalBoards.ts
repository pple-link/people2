import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseBoard } from "./BaseBoard";

@Entity()
export abstract class NormalBoard extends BaseBoard {}
