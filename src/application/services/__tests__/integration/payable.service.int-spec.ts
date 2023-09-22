import 'reflect-metadata';
import { PrismaService } from '@src/infrastructure/services';
import { CardEnum } from '@src/shared/utils/card.enum';
import { IPayableService } from '@src/application/services';
import { PayableService } from '@src/application/services';
import { TransactionEntity } from '@src/domain/entities';
import { PayableEntity } from '@src/domain/entities';
import { IPayableRepository } from '@src/infrastructure/repositories';
import { PayableRepository } from '@src/infrastructure/repositories';

describe('Payable integration tests', () => {
  let sut: IPayableService;
  const expires_date = new Date();
  let entity: PayableEntity;
  let transactionEntity: TransactionEntity;
  let repository: IPayableRepository;
  const prismaService = new PrismaService();
  let transaction_id = 0;
  beforeAll(async () => {
    repository = new PayableRepository(prismaService);
    sut = new PayableService(repository);
    transactionEntity = TransactionEntity.createEntity({
      price: 100.5,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: 855,
    });
  });
  beforeEach(async () => {
    const transaction = await prismaService.transaction.create({
      data: { ...transactionEntity, cvv: parseInt(transactionEntity.cvv.toString()) },
    });
    transaction_id = transaction.id;
    entity = PayableEntity.createEntity({
      transaction_id: transaction_id,
      amount: 100,
      payment_date: new Date(),
      status: 'paid',
      availability: 'available',
    });
  });
  afterEach(async () => {
    await prismaService.payable.deleteMany();
    await prismaService.transaction.deleteMany();
  });

  it('should create a  Payable', async () => {
    const payable = await sut.create(entity);
    expect(payable).toStrictEqual({
      id: expect.any(Number),
      transaction_id: expect.any(Number),
      amount: 100,
      availability: 'available',

      payment_date: expect.any(Date),
      status: 'paid',
    });
  });
  it('should return the payables with available = 1000', async () => {
    await prismaService.payable.create({
      data: { ...entity, amount: 1000, status: 'paid', availability: 'available' },
    });
    const payables = await sut.getAll();
    expect(payables).toStrictEqual({
      available: 1000,
      waiting_funds: 0,
    });
  });
  it('should return the payables with waiting_funds = 1000', async () => {
    await prismaService.payable.create({
      data: { ...entity, amount: 1000, status: 'waiting_funds', availability: 'waiting_funds' },
    });
    const payables = await sut.getAll();
    expect(payables).toStrictEqual({
      available: 0,
      waiting_funds: 1000,
    });
  });
  it('should return the payables info', async () => {
    await prismaService.payable.create({
      data: entity,
    });
    const payables = await sut.getAllInfo();
    expect(payables).toStrictEqual([
      {
        id: expect.any(Number),
        transaction_id: transaction_id,
        amount: 100,
        availability: 'available',
        payment_date: expect.any(Date),
        status: 'paid',
      },
    ]);
  });
});
