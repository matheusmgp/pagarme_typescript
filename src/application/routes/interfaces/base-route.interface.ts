import { Router } from 'express';

export interface IBaseRoute {
  router: Router;
  registerRoutes(): void;
}
