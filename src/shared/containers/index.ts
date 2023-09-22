import { IPayableRepository } from '../../infrastructure/repositories';
import { ITransactionRepository } from '../../infrastructure/repositories';
import { PayableRepository } from '../../infrastructure/repositories';
import { TransactionRepository } from '../../infrastructure/repositories';
import { IPayableService } from '../../application/services';
import { ITransactionService } from '../../application/services';
import { PayableService } from '../../application/services';
import { TransactionService } from '../../application/services';
import { container } from 'tsyringe';

/**
 * REPOSITORIES
 */
container.registerSingleton<IPayableRepository>('PayableRepository', PayableRepository);
container.registerSingleton<ITransactionRepository>('TransactionRepository', TransactionRepository);

/**
 * SERVICES
 */
container.registerSingleton<IPayableService>('PayableService', PayableService);
container.registerSingleton<ITransactionService>('TransactionService', TransactionService);
