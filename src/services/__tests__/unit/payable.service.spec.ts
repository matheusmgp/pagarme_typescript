import 'reflect-metadata';
import { PayableEntityProps } from '@src/entities/payable.entity';
import { IPayableRepository } from '@src/repositories/interfaces/payable-repository.interface';
import { IPayableService } from '@src/services/interfaces/payable-service.interface';
import { PayableService } from '@src/services/payable/payable.service';

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
});
