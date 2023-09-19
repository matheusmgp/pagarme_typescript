import { BaseError } from './base-error';

export class DatabaseError extends BaseError {
  constructor(public message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
