import { TransactionEntity, TransactionEntityProps } from '../../entities/transaction.entity';

export interface ITransactionService {
  create(payload: TransactionEntityProps): Promise<any>;
  getAll(): Promise<any>;
  setStatus(paymentmethod: string): string;
  setPaymentDate(paymentmethod: string): Date;
  calculateFee(paymentmethod: string, transactionPrice: number): number;
  setAvailability(paymentmethod: string): string;
}
