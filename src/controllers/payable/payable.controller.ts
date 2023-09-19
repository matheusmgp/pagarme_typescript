import 'reflect-metadata';
import { BaseError } from '../../errors/base-error';
import { httpStatusCodes } from '../../errors/status-code/http-status-code';
import { responseHttpException, responseHttpSuccess } from '../../presenters/httpResponse';
import { IPayableService } from '../../services/interfaces/payable-service.interface';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PayableController {
  constructor(
    @inject('PayableService')
    private readonly service: IPayableService
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
  async getAllInfo(req: Request, res: Response) {
    try {
      responseHttpSuccess(await this.service.getAllInfo(), res, req);
    } catch (err: any) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, httpStatusCodes.BAD_REQUEST);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
}
