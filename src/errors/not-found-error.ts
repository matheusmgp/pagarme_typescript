import { ErrorBase } from './error-base';

export class NotFoundError extends ErrorBase<'NOTFOUND_ERROR'> {
  message: string;
  cause: any;
  constructor(message: string, cause: any) {
    super({ name: 'NOTFOUND_ERROR', message, cause });
    this.message = message;
    this.cause = cause;
  }
}
