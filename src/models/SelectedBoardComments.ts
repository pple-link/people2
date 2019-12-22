import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseComment } from "./BaseComment";

@Entity()
export abstract class NormalBoardComment extends BaseComment {}
