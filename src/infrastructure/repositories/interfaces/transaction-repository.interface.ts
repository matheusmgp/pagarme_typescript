import { TransactionEntity } from '../../../domain/entities';
import { IBaseRepository } from './base-repository.interface';

export interface ITransactionRepository extends IBaseRepository<TransactionEntity> {
  getAll(): Promise<any>;
}
