import { inject, injectable } from 'tsyringe';
import { ITransactionService } from '../interfaces/transaction-service.interface';
import { TransactionEntity, TransactionEntityProps } from '../../entities/transaction.entity';
import { CardEnum } from '../../utils/card.enum';
import { ITransactionRepository } from '../../repositories/interfaces/transaction-repository.interface';
import { DatabaseError, DatabaseUnknowError } from '../../errors/database-error';
import { PayableEntity } from '../../entities/payable.entity';
import { IPayableService } from '../interfaces/payable-service.interface';
import { BadRequestError } from '../../errors/bad-request-error';
import Logger from '../../logger/logger';
const logger = Logger.getInstance();

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject('TransactionRepository')
    private readonly repository: ITransactionRepository,
    @inject('PayableService')
    private readonly payableService: IPayableService
  ) {}
  async create(payload: TransactionEntityProps): Promise<TransactionEntity | undefined> {
    logger.log('TransactionService [CREATE]', payload);
    const { price, payment_method } = payload;
    try {
      const transaction = await this.repository.create(TransactionEntity.createEntity(payload));

      const payableEntity = PayableEntity.createEntity({
        transaction_id: transaction.id,
        amount: this.calculateFee(payment_method, price),
        payment_date: this.setPaymentDate(payment_method),
        status: this.setStatus(payment_method),
        availability: this.setAvailability(payment_method),
      });

      await this.payableService.create(payableEntity);

      return transaction;
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAll(): Promise<TransactionEntity[] | undefined> {
    logger.log('TransactionService [GETALL]');
    try {
      return await this.repository.getAll();
    } catch (err: any) {
      this.handleError(err);
    }
  }
  setStatus(paymentmethod: string): string {
    return paymentmethod === CardEnum.DEBIT ? 'paid' : 'waiting_funds';
  }
  setPaymentDate(paymentmethod: string): Date {
    const paymentDate = new Date();
    const days = 30;
    paymentDate.setDate(paymentDate.getDate() + days);
    return paymentmethod === CardEnum.DEBIT ? new Date() : paymentDate;
  }
  calculateFee(paymentmethod: string, transactionPrice: number): number {
    if (paymentmethod === CardEnum.DEBIT) return transactionPrice - transactionPrice * 0.03;
    else return transactionPrice - transactionPrice * 0.05;
  }
  setAvailability(paymentmethod: string): string {
    return paymentmethod === CardEnum.DEBIT ? 'available' : 'waiting_funds';
  }
  protected handleError(err: any): void {
    if (err instanceof DatabaseError) {
      throw new DatabaseError(err.message, err.cause);
    }
    if (err instanceof DatabaseUnknowError) {
      throw new DatabaseUnknowError(`Houve um problema`, err.cause);
    }
    throw new BadRequestError(`Houve um problema`, err.cause);
  }
}
