import 'reflect-metadata';
import { IPayableService } from '@src/application/services';
import { PayableService } from '@src/application/services';
import { IPayableRepository } from '@src/infrastructure/repositories';
import { PayableEntityProps } from '@src/domain/entities';

describe('PayableService unit tests', () => {
  let sut: IPayableService;
  const expires_date = new Date();
  let repository: IPayableRepository;
  let props: PayableEntityProps;
  beforeAll(() => {
    props = {
      transaction_id: 1,
      amount: 50,
      payment_date: new Date(expires_date.getTime() + 150),
      status: 'paid',
      availability: 'available',
    };
    sut = new PayableService(repository);
  });
  it('should return the sum', () => {
    let amount_ = sut.reduce([
      { ...props, amount: 1 },
      { ...props, amount: 1 },
      { ...props, amount: 1 },
    ]);
    expect(amount_).toStrictEqual(3);
    amount_ = sut.reduce([
      { ...props, amount: 10 },
      { ...props, amount: 10 },
      { ...props, amount: 10 },
    ]);
    expect(amount_).toStrictEqual(30);
    amount_ = sut.reduce([
      { ...props, amount: 1032 },
      { ...props, amount: 1430 },
      { ...props, amount: 155550 },
    ]);
    expect(amount_).toStrictEqual(158012);
    amount_ = sut.reduce([
      { ...props, amount: 100000 },
      { ...props, amount: 100000 },
      { ...props, amount: 100000 },
    ]);
    expect(amount_).toStrictEqual(300000);
  });
  it('should return the number rounded', () => {
    let amount_ = sut.roundNumber(10.0);
    expect(amount_).toStrictEqual(10);
    amount_ = sut.roundNumber(10.015);
    expect(amount_).toStrictEqual(10.02);
    amount_ = sut.roundNumber(10.15222);
    expect(amount_).toStrictEqual(10.15);
    amount_ = sut.roundNumber(10);
    expect(amount_).toStrictEqual(10);
    amount_ = sut.roundNumber(867552.4481);
    expect(amount_).toStrictEqual(867552.45);
    amount_ = sut.roundNumber(321687.3432);
    expect(amount_).toStrictEqual(321687.34);
  });
});
