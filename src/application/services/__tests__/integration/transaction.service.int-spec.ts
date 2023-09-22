import 'reflect-metadata';

import { ITransactionService } from '@src/application/services/interfaces/transaction-service.interface';
import { PrismaService } from '@src/infrastructure/services/prisma/prisma.service';
import { TransactionService } from '@src/application/services/transaction/transaction.service';
import { CardEnum } from '@src/shared/utils/card.enum';
import { IPayableService } from '@src/application/services/interfaces/payable-service.interface';
import { PayableService } from '@src/application/services/payable/payable.service';
import { TransactionEntity } from '@src/domain';
import { ITransactionRepository } from '@src/infrastructure/repositories/interfaces/transaction-repository.interface';
import { IPayableRepository } from '@src/infrastructure/repositories/interfaces/payable-repository.interface';
import { TransactionRepository } from '@src/infrastructure/repositories/transaction/transaction.repository';
import { PayableRepository } from '@src/infrastructure/repositories/payable/payable.repository';

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
