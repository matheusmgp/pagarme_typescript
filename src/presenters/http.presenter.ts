import { Request, Response } from 'express';

export const responseHttpSuccess = (data: any, res: Response, req: Request) => {
  res.status(res.statusCode).json(new HttpResponse(res.statusCode, data, req.method).toJSON());
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
