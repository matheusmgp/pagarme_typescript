import { TransactionEntity } from '../../entities/transaction.entity';

export interface ITransactionRepository {
  create(payload: TransactionEntity): Promise<any>;
  getAll(): Promise<any>;
}
