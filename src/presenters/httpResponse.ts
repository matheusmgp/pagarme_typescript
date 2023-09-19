import { Request, Response } from 'express';

export const responseHttpSuccess = (data: any, res: Response, req: Request) => {
  res.status(res.statusCode).json(new HttpResponse(res.statusCode, data, req.method).toJSON());
};
export const responseHttpException = (error: any, method: string, res: Response, statusCode: number) => {
  res.status(statusCode).send(new HttpExceptionResponse(statusCode, error, method).toJSON());
};

export class HttpResponse {
  constructor(statusCode: number, data: any, method: string) {
    this.data = data;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
  statusCode;
  data;
  timestamp;
  method;
  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      timestamp: this.timestamp,
      method: this.method,
    };
  }
}
export class HttpExceptionResponse {
  constructor(statusCode: number, error: any, method: string) {
    this.message = error;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
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
    };
  }
}
