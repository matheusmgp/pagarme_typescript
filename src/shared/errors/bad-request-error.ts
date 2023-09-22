import { ErrorBase } from './error-base';

export class BadRequestError extends ErrorBase<'BADREQUEST_ERROR'> {
  message: string;
  cause: any;
  constructor(message: string, cause: any) {
    super({ name: 'BADREQUEST_ERROR', message, cause });
    this.message = message;
    this.cause = cause;
  }
}
