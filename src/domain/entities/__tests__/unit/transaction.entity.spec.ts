import { CardEnum } from '@src/shared/utils';
import { TransactionEntity, TransactionEntityProps } from '../../.';

describe('TransactionEntity unit tests', () => {
  let sut: TransactionEntity;
  const expires_date = new Date();
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
    sut = TransactionEntity.createEntity(props);
  });
  it('toJSON  method', () => {
    expect(sut.toJSON()).toStrictEqual({
      id: undefined,
      price: 1,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: 855,
    });
  });
  it('toJSON  method passing id', () => {
    const prop = { ...props, id: 100 };
    sut = TransactionEntity.createEntity(prop);
    expect(sut.toJSON()).toStrictEqual({
      id: 100,
      price: 1,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: 855,
    });
  });
  it('maskCardNumber  method', () => {
    expect(sut.card_number).toStrictEqual('*******8910');
  });
  it('should return a instance of TransactionEntity', () => {
    const result = TransactionEntity.createEntity(props);
    expect(result).toBeInstanceOf(TransactionEntity);
    expect(result.price).toEqual(1);
    expect(result.description).toEqual('Smartband XYZ 3.0');
    expect(result.payment_method).toEqual(CardEnum.DEBIT);
    expect(result.card_number).toEqual('*******8910');
    expect(result.owner_name).toEqual('matheus');
    expect(result.card_expires_date).toBeInstanceOf(Date);
    expect(result.cvv).toEqual(855);
  });
  it('should return a instance of TransactionEntity passing id', () => {
    const result = TransactionEntity.createEntity({ ...props, id: 100 });
    expect(result).toBeInstanceOf(TransactionEntity);
    expect(result.id).toEqual(100);
    expect(result.price).toEqual(1);
    expect(result.description).toEqual('Smartband XYZ 3.0');
    expect(result.payment_method).toEqual(CardEnum.DEBIT);
    expect(result.card_number).toEqual('*******8910');
    expect(result.owner_name).toEqual('matheus');
    expect(result.card_expires_date).toBeInstanceOf(Date);
    expect(result.cvv).toEqual(855);
  });
});
