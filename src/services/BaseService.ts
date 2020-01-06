import { getConnection, Repository } from "typeorm";
export type ObjectType<T> = { new (): T } | Function;

export abstract class BaseService<T> {
  protected genericRepository: Repository<T>;
  private repo: ObjectType<T>;
  constructor(repo: ObjectType<T>) {
    this.genericRepository = getConnection().getRepository(repo);
    this.repo = repo;
  }

  public async list(relations?: Array<string>): Promise<T[]> {
    const result: T[] = await (<Promise<T[]>>(
      this.genericRepository.find({ relations: relations })
    ));
    return result;
  }

  public async getById(id: number, relations?: Array<string>): Promise<T> {
    return await (<Promise<T>>this.genericRepository.findOne({
      where: { id: id },
      relations: relations
    }));
  }

  public async getByWhere(
    where: Object,
    relations?: Array<string>
  ): Promise<T[]> {
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
