import {
  CreateDateColumn, Generated, PrimaryColumn, UpdateDateColumn, ValueTransformer,
} from 'typeorm';

const bigIntTransformer: ValueTransformer = {
  to: (entitiyValue: bigint) => entitiyValue,
  from: (databaseValue: string) => parseInt(databaseValue, 10),
};

export abstract class BaseModel {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: [bigIntTransformer] })
  public id!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
