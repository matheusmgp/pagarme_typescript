import 'reflect-metadata';
import { httpStatusCodes } from '../../../shared/status-code';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ResponseProps, responseHttpException, responseHttpSuccess } from '../../presenters';
import { IPayableService } from '../../../application/services';

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
      const props: ResponseProps = {
        res,
        name: err.name,
        cause: err.cause,
        statusCode: httpStatusCodes.INTERNAL_SERVER,
        message: err.message,
        method: req.method,
      };
      responseHttpException(props);
    }
  }
  async getAllInfo(req: Request, res: Response) {
    try {
      responseHttpSuccess(await this.service.getAllInfo(), res, req);
    } catch (err: any) {
      const props: ResponseProps = {
        res,
        name: err.name,
        cause: err.cause,
        statusCode: httpStatusCodes.INTERNAL_SERVER,
        message: err.message,
        method: req.method,
      };
      responseHttpException(props);
    }
  }
}
