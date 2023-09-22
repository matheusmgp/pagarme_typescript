import { Router } from 'express';
import { IBaseRoute } from './interfaces/base-route.interface';

export abstract class BaseRoutes implements IBaseRoute {
  public router: Router;
  constructor() {
    this.router = Router();
  }
  registerRoutes(): void {}
}
