import { BaseController } from "./BaseController";
import { BaseCommentService } from "../services/BaseCommentService";
import { BaseComment } from "../models";
import { NotFoundError } from "routing-controllers";
import { DeleteResult } from "typeorm";

export abstract class BaseCommentController<
  U extends BaseComment,
  T extends BaseCommentService<U>
> extends BaseController {
  protected service: T;
  constructor(service: T) {
    super();
    this.service = service;
  }

  protected async update(id: number, comment: string): Promise<BaseComment> {
    const _comment = this.service.getById(id);
    if (!_comment) throw new NotFoundError("this commment is undefined");
    return await this.service.update(id, comment);
  }

  protected async updateReport(id: number): Promise<BaseComment> {
    const _comment = this.service.getById(id);
    if (!_comment) throw new NotFoundError("this commment is undefined");
    return await this.service.updateReportCount(id);
  }

  protected async delete(id: number): Promise<DeleteResult> {
    const _comment = this.service.getById(id);
    if (!_comment) throw new NotFoundError("this commment is undefined");
    return await this.service.delete(id);
  }
}
