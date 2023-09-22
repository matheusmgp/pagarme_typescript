import { Router, Express } from 'express';
import { PayableRoutes } from './payable.route';
import { NotFoundRoutes } from './not-found.route';
import { TransactionRoutes } from './transaction.route';

export const setupRoutes = (app: Express): void => {
  const router = Router();

  router.use(new PayableRoutes().router);
  router.use(new TransactionRoutes().router);
  router.use(new NotFoundRoutes().router);

  app.use('/api/v1/dev/', router);
};
