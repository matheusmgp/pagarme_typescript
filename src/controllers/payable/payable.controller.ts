import 'reflect-metadata';
import { httpStatusCodes } from '../../errors/status-code/http-status-code';
import { responseHttpSuccess } from '../../presenters/http.presenter';
import { IPayableService } from '../../services/interfaces/payable-service.interface';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ResponseProps, responseHttpException } from '../../presenters/http-exception.presenter';

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
