import 'reflect-metadata';
import { TransactionEntity } from '@src/entities/transaction.entity';
import { ITransactionRepository } from '@src/repositories/interfaces/transaction-repository.interface';
import { TransactionRepository } from '@src/repositories/transaction/transaction.repository';
import { ITransactionService } from '@src/services/interfaces/transaction-service.interface';
import { PrismaService } from '@src/services/prisma/prisma.service';
import { TransactionService } from '@src/services/transaction/transaction.service';
import { CardEnum } from '@src/utils/card.enum';
import { IPayableService } from '@src/services/interfaces/payable-service.interface';
import { IPayableRepository } from '@src/repositories/interfaces/payable-repository.interface';
import { PayableService } from '@src/services/payable/payable.service';
import { PayableRepository } from '@src/repositories/payable/payable.repository';

describe('Transaction integration tests', () => {
  let sut: ITransactionService;
  const expires_date = new Date();
  let entity: TransactionEntity;
  let repository: ITransactionRepository;
  let payableRepo: IPayableRepository;
  const prismaService = new PrismaService();
  let payableService: IPayableService;
  beforeAll(() => {
    repository = new TransactionRepository(prismaService);
    payableRepo = new PayableRepository(prismaService);

    payableService = new PayableService(payableRepo);
    sut = new TransactionService(repository, payableService);
    entity = TransactionEntity.createEntity({
      price: 100.5,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '12345678910',
      owner_name: 'matheus',
      card_expires_date: new Date(expires_date.getTime() + 150),
      cvv: 855,
    });
  });
  afterEach(async () => {
    await prismaService.payable.deleteMany();
    await prismaService.transaction.deleteMany();
  });

  it('should create a Transaction and Payable ', async () => {
    const transaction = await sut.create(entity);
    expect(transaction).toStrictEqual({
      id: expect.any(Number),
      price: 100.5,
      description: 'Smartband XYZ 3.0',
      payment_method: CardEnum.DEBIT,
      card_number: '*******8910',
      owner_name: 'matheus',
      card_expires_date: expect.any(Date),
      cvv: 855,
    });
  });
  it('should set 5% of fee when using credit_card', async () => {
    await sut.create({ ...entity, payment_method: CardEnum.CREDIT });
    const payable = await payableService.getAll();
    expect(payable).toStrictEqual({ available: 0, waiting_funds: 95.48 });
  });
  it('should set 3% of fee when using debit_card', async () => {
    await sut.create({ ...entity, payment_method: CardEnum.DEBIT });
    const payable = await payableService.getAll();
    expect(payable).toStrictEqual({ available: 97.49, waiting_funds: 0 });
  });
});
