import 'reflect-metadata';
import { ITransactionService } from '@src/application/services/interfaces/transaction-service.interface';
import { TransactionService } from '@src/application/services/transaction/transaction.service';
import { CardEnum } from '@src/shared/utils/card.enum';
import { IPayableService } from '@src/application/services/interfaces/payable-service.interface';
import { ITransactionRepository } from '@src/infrastructure/repositories/interfaces/transaction-repository.interface';
import { TransactionEntityProps } from '@src/domain/entities/transaction.entity';

describe('TransactionService unit tests', () => {
  let sut: ITransactionService;
  const expires_date = new Date();
  let repository: ITransactionRepository;
  let payableService: IPayableService;
  let props: TransactionEntityProps;
  beforeAll(() => {
    props = {
      price: 1.0,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: 855,
    };
    sut = new TransactionService(repository, payableService);
  });
  it('should set status to paid', () => {
    const status = sut.setStatus(CardEnum.DEBIT);
    expect(status).toStrictEqual('paid');
  });
  it('should set status to waiting_funds', () => {
    const status = sut.setStatus(CardEnum.CREDIT);
    expect(status).toStrictEqual('waiting_funds');
  });
  it('should set paymentDate to plus 30 days', () => {
    const current = new Date();
    current.setDate(current.getDate() + 30);
    const paymentDate = sut.setPaymentDate(CardEnum.CREDIT);
    expect(paymentDate.toLocaleString().split(' ')[0]).toStrictEqual(current.toLocaleString().split(' ')[0]);
  });
  it('should set paymentDate to current', () => {
    const current = new Date();
    const paymentDate = sut.setPaymentDate(CardEnum.DEBIT);
    expect(paymentDate).toStrictEqual(current);
  });
  it('should discount fee of 3%', () => {
    let amount = sut.calculateFee(CardEnum.DEBIT, 10);
    expect(amount).toStrictEqual(9.7);
    amount = sut.calculateFee(CardEnum.DEBIT, 100);
    expect(amount).toStrictEqual(97);
    amount = sut.calculateFee(CardEnum.DEBIT, 1000);
    expect(amount).toStrictEqual(970);
    amount = sut.calculateFee(CardEnum.DEBIT, 10000);
    expect(amount).toStrictEqual(9700);
  });
  it('should discount fee of 5%', () => {
    let amount = sut.calculateFee(CardEnum.CREDIT, 10);
    expect(amount).toStrictEqual(9.5);
    amount = sut.calculateFee(CardEnum.CREDIT, 100);
    expect(amount).toStrictEqual(95);
    amount = sut.calculateFee(CardEnum.CREDIT, 1000);
    expect(amount).toStrictEqual(950);
    amount = sut.calculateFee(CardEnum.CREDIT, 10000);
    expect(amount).toStrictEqual(9500);
  });
  it('should set availability to waiting_funds', () => {
    const availability = sut.setAvailability(CardEnum.CREDIT);
    expect(availability).toStrictEqual('waiting_funds');
  });
  it('should set availability to available', () => {
    const availability = sut.setAvailability(CardEnum.DEBIT);
    expect(availability).toStrictEqual('available');
  });
});
