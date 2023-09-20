import { NextFunction, Request, Response } from 'express';
import { transactionSchema } from './schemas/transaction.schema';
import { ResponseProps, responseHttpException } from '../presenters/http-exception.presenter';
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
    const props: ResponseProps = {
      res,
      name: 'VALIDATION_ERROR',
      cause: 'missing field',
      statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
      message: error.details.map((x: any) => x.message.replace('"', '').replace('"', '')),
      method: req.method,
    };
    responseHttpException(props);
  } else {
    req.body = value;
    next();
  }
};
