import { Router } from 'express';
import { PayableRoutes } from './payable.route';
import { TransactionRoutes } from './transaction.route';

const router = Router();

router.use(new PayableRoutes().router);
router.use(new TransactionRoutes().router);

export { router };
