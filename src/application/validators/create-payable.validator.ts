import { NextFunction, Request, Response } from 'express';
import { payableSchema } from './schemas/payable.schema';
import { ResponseProps, responseHttpException } from '../presenters/http-exception.presenter';
import { httpStatusCodes } from '../../shared/status-code';

export const createPayableSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = payableSchema;

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
