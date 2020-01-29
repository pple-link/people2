import { getConnection, Repository, IsNull } from "typeorm";
import { BaseModel } from "../models/BaseModel";
import { ShowFlag } from "../models/Enum";
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
    if ((take || take == 0) && (skip || skip == 0)) {
      const list = await this.genericRepository.findAndCount({
        order: { createdAt: "DESC" },
        where: { deletedAt: IsNull(), showFlag: ShowFlag["SHOW"] },
        relations: relations,
        take: take,
        skip: skip
      });
      return list;
    } else {
      const blist = await (<Promise<T[]>>(
        this.genericRepository.find({ relations: relations })
      ));

      const array = [blist, blist.length];
      return array;
    }
  }

  public async getById(id: number, relations?: Array<string>): Promise<T> {
    return await (<Promise<T>>this.genericRepository.findOne({
      where: { id: id },
      relations: relations
    }));
  }

  public async getByWhere(
    where: Array<Object> | Object,
    relations?: Array<string>,
    skip?: number,
    take?: number
  ): listForm<T> {
    if ((take || take == 0) && (skip || skip == 0)) {
      const list = await this.genericRepository.findAndCount({
        where: where,
        order: { createdAt: "DESC" },
        relations: relations,
        take: take,
        skip: skip
      });

      return list;
    } else {
      return await (<Promise<T[]>>this.genericRepository.find({
        where: where,
        relations: relations
      }));
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
