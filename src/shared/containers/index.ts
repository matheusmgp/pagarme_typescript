import { IPayableRepository } from '../../repositories/interfaces/payable-repository.interface';
import { ITransactionRepository } from '../../repositories/interfaces/transaction-repository.interface';
import { PayableRepository } from '../../repositories/payable/payable.repository';
import { TransactionRepository } from '../../repositories/transaction/transaction.repository';
import { IPayableService } from '../../services/interfaces/payable-service.interface';
import { ITransactionService } from '../../services/interfaces/transaction-service.interface';
import { PayableService } from '../../services/payable/payable.service';
import { TransactionService } from '../../services/transaction/transaction.service';
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
