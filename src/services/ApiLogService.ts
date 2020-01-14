import { BaseService } from "./BaseService";
import { APILog, User } from "../models";
import { Service } from "typedi";

@Service()
export class ApiLogService extends BaseService<APILog> {
  constructor() {
    super(APILog);
  }

  public async save(
    user: User,
    path: string,
    responseTime: number
  ): Promise<APILog> {
    return this.genericRepository.save({
      user: user,
      log: path,
      responseTime: responseTime
    });
  }
}
