import { Router } from 'express';
import { PayableRoutes } from './payable.route';
import { TransactionRoutes } from './transaction.route';
import { NotFoundRoutes } from './not-found.route';

const router = Router();

router.use(new PayableRoutes().router);
router.use(new TransactionRoutes().router);
router.use(new NotFoundRoutes().router);

export { router };
