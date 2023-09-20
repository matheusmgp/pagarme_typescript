import { TransactionEntity } from '../../entities/transaction.entity';
import { IBaseRepository } from './base-repository.interface';

export interface ITransactionRepository extends IBaseRepository<TransactionEntity> {
  getAll(): Promise<any>;
}
