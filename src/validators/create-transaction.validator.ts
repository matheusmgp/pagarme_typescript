import { NextFunction, Request, Response } from 'express';
import { transactionSchema } from './schemas/transaction.schema';
import { responseHttpException } from '../presenters/httpResponse';
import { httpStatusCodes } from '../errors/status-code/http-status-code';

export const createTransactionSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = transactionSchema;
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    responseHttpException(
      error.details.map((x: any) => x.message.replace('"', '').replace('"', '')),
      req.method,
      res,
      httpStatusCodes.UNPROCESSABLE_ENTITY
    );
  } else {
    req.body = value;
    next();
  }
};
