import { PayableEntity, PayableEntityProps } from '@src/entities/payable.entity';

describe('PayableEntity unit tests', () => {
  let sut: PayableEntity;
  const expires_date = new Date();
  let props: PayableEntityProps;
  beforeAll(() => {
    props = {
      transaction_id: 1,
      amount: 50,
      payment_date: new Date(expires_date.getTime() + 150),
      status: 'paid',
      availability: 'available',
    };
    sut = new PayableEntity(props);
  });

  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      transaction_id: 1,
      amount: 50,
      payment_date: expect.any(Date),
      status: 'paid',
      availability: 'available',
    });
  });
  it('should return a instance of PayableEntity', () => {
    const result = PayableEntity.createEntity(props);
    expect(result).toBeInstanceOf(PayableEntity);
    expect(result.transaction_id).toEqual(1);
    expect(result.amount).toEqual(50);
    expect(result.status).toEqual('paid');
    expect(result.availability).toEqual('available');
    expect(result.payment_date).toBeInstanceOf(Date);
  });
});
