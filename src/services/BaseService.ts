import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
export type ObjectType<T> = { new (): T } | Function;

@Service()
export class BaseService<T> {
  protected genericRepository: Repository<T>;
  constructor(repo: ObjectType<T>) {
    this.genericRepository = getConnection().getRepository(repo);
  }

  public async list(): Promise<T[]> {
    const result: T[] = await (<Promise<T[]>>this.genericRepository.find());
    return result;
  }

  public async getById(id: number, relations?: Array<string>): Promise<T> {
    return await (<Promise<T>>this.genericRepository.findOne({
      where: { id: id },
      relations: relations
    }));
  }
}
