import { TransactionEntity, TransactionEntityProps } from '../../entities/transaction.entity';

export interface ITransactionService {
  create(payload: TransactionEntityProps): Promise<TransactionEntity | undefined>;
  getAll(): Promise<TransactionEntity[] | undefined>;
  setStatus(paymentmethod: string): string;
  setPaymentDate(paymentmethod: string): Date;
  calculateFee(paymentmethod: string, transactionPrice: number): number;
  setAvailability(paymentmethod: string): string;
}
