import { Response } from 'express';

export interface ResponseProps extends HttpExceptionResponseProps {
  res: Response;
}
export const responseHttpException = (props: ResponseProps) => {
  props.res.status(props.statusCode).send(
    new HttpExceptionResponse({
      statusCode: props.statusCode,
      message: props.message,
      method: props.method,
      name: props.name,
      cause: props.cause,
    }).toJSON()
  );
};
export type HttpExceptionResponseProps = {
  name: string;
  cause?: string;
  statusCode: number;
  message: string[];
  method: string;
};
export class HttpExceptionResponse {
  constructor(props: HttpExceptionResponseProps) {
    this.message = props.message;
    this.method = props.method;
    this.statusCode = props.statusCode;
    this.name = props.name;
    this.cause = props.cause;
    this.timestamp = new Date().toISOString();
  }
  name;
  cause;
  statusCode;
  message;
  timestamp;
  method;
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      timestamp: this.timestamp,
      method: this.method,
      name: this.name,
      cause: this.cause,
    };
  }
}
