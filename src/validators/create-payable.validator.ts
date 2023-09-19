import { NextFunction, Request, Response } from 'express';
import { payableSchema } from './schemas/payable.schema';
import { responseHttpException } from '../presenters/httpResponse';
import { httpStatusCodes } from '../errors/status-code/http-status-code';

export const createPayableSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = payableSchema;

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
