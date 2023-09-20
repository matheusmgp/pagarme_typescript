import { ErrorBase } from './error-base';

export class DatabaseError extends ErrorBase<'DATABASE_ERROR'> {
  message: string;
  cause: any;
  constructor(message: string, cause: any) {
    super({ name: 'DATABASE_ERROR', message, cause });
    this.message = message;
    this.cause = cause;
  }
}

export class DatabaseUnknowError extends DatabaseError {
  message: string;
  cause: any;
  constructor(message: string, cause: any) {
    super(message, cause);
    this.message = message;
    this.cause = cause;
  }
}
