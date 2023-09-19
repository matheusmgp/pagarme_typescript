import { BaseError } from '../../errors/base-error';
import { httpStatusCodes } from '../../errors/status-code/http-status-code';
import { responseHttpException, responseHttpSuccess } from '../../presenters/httpResponse';
import { ITransactionService } from '../../services/interfaces/transaction-service.interface';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class TransactionController {
  constructor(
    @inject('TransactionService')
    private readonly service: ITransactionService
  ) {}
  async getAll(req: Request, res: Response) {
    try {
      responseHttpSuccess(await this.service.getAll(), res, req);
    } catch (err: any) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, httpStatusCodes.BAD_REQUEST);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
  async create(req: Request, res: Response) {
    try {
      responseHttpSuccess(await this.service.create(req.body), res, req);
    } catch (err: any) {
      console.log(err);
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, httpStatusCodes.BAD_REQUEST);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
}
