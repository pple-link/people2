import { getConnection, Repository } from "typeorm";
import { BaseModel } from "../models/BaseModel";
export type ObjectType<T> = { new (): T } | Function;
export type listForm<T> = Promise<[T[], number]> | Promise<T[]>;
const listForm = Promise;

export abstract class BaseService<T extends BaseModel> {
  protected genericRepository: Repository<T>;
  private repo: ObjectType<T>;
  constructor(repo: ObjectType<T>) {
    this.genericRepository = getConnection().getRepository(repo);
    this.repo = repo;
  }

  public async list(
    relations?: Array<string>,
    skip?: number,
    take?: number
  ): listForm<T> {
    if (skip && take) {
      const [result, total] = (await this.genericRepository.findAndCount({
        order: { createdAt: "DESC" },
        where: {},
        relations: relations,
        take: take,
        skip: skip
      })) as any;
      return [result, total];
    } else {
      return await (<Promise<T[]>>(
        this.genericRepository.find({ relations: relations })
      ));
    }
  }

  public async getById(id: number, relations?: Array<string>): Promise<T> {
    return await (<Promise<T>>this.genericRepository.findOne({
      where: { id: id },
      relations: relations
    }));
  }

  public async getByWhere(
    where: Object,
    relations?: Array<string>,
    take?: number,
    skip?: number
  ): listForm<T> {
    if (take && skip) {
      const [result, total] = (await this.genericRepository.findAndCount({
        order: { createdAt: "DESC" },
        where: where,
        relations: relations,
        take: take,
        skip: skip
      })) as any;
      return [result, total];
    } else {
      return (await (<Promise<T[]>>this.genericRepository.find({
        where: where,
        relations: relations
      }))) as any;
    }
  }

  public async delete(id: number): Promise<any> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(this.repo)
      .where("id = :id", { id: id })
      .execute();
  }
}
