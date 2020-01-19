import { getConnection, Repository } from "typeorm";
export type ObjectType<T> = { new (): T } | Function;

export abstract class BaseService<T> {
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
  ): Promise<T[]> {
    if (skip && take) {
      return (await this.genericRepository.findAndCount({
        where: {},
        relations: relations,
        take: take,
        skip: skip
      })) as any;
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
  ): Promise<T[]> {
    if (take && skip) {
      return (await this.genericRepository.findAndCount({
        where: where,
        relations: relations,
        take: take,
        skip: skip
      })) as any;
    } else {
    }
    return (await (<Promise<T[]>>this.genericRepository.find({
      where: where,
      relations: relations
    }))) as any;
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
