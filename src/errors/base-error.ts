export class BaseError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'BaseError';
  }
}
