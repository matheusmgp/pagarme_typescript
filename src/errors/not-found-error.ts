import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  constructor(public message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
