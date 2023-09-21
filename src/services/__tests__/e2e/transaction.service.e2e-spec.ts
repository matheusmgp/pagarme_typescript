import 'reflect-metadata';
import { TransactionEntity } from '@src/entities/transaction.entity';
import { PrismaService } from '@src/services/prisma/prisma.service';
import { CardEnum } from '@src/utils/card.enum';
import request from 'supertest';
import { ITransactionService } from '@src/services/interfaces/transaction-service.interface';
import { TransactionService } from '@src/services/transaction/transaction.service';
import { IPayableRepository } from '@src/repositories/interfaces/payable-repository.interface';
import { PayableService } from '@src/services/payable/payable.service';
import { IPayableService } from '@src/services/interfaces/payable-service.interface';
import { ITransactionRepository } from '@src/repositories/interfaces/transaction-repository.interface';
import { PayableRepository } from '@src/repositories/payable/payable.repository';
import { TransactionRepository } from '@src/repositories/transaction/transaction.repository';
import app from '../../../index';

describe('Transaction e2e tests', () => {
  let sut: ITransactionService;
  const expires_date = new Date();
  let entity: TransactionEntity;
  let repository: ITransactionRepository;
  let payableRepo: IPayableRepository;
  let payableService: IPayableService;
  const prismaService = new PrismaService();
  beforeAll(() => {
    repository = new TransactionRepository(prismaService);
    payableRepo = new PayableRepository(prismaService);
    payableService = new PayableService(payableRepo);
    sut = new TransactionService(repository, payableService);
    entity = TransactionEntity.createEntity({
      price: 100.0,
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
  it('defined', () => {
    expect(app).toBeDefined();
  });
  it('should create a Transaction and Payable', async () => {
    const response = await request(app)
      .post('/api/v1/dev/transaction')
      .send(entity)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: {
        id: expect.any(Number),
        price: 100,
        description: 'Smartband XYZ 3.0',
        payment_method: CardEnum.DEBIT,
        card_number: '*******8910',
        owner_name: 'matheus',
        card_expires_date: expect.any(String),
        cvv: 855,
      },
      timestamp: expect.any(String),
      method: 'POST',
    });
  });
  it('should set 5% of fee when using credit_card', async () => {
    await sut.create({ ...entity, payment_method: CardEnum.CREDIT });
    const response = await request(app).get('/api/v1/dev/payable');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 0, waiting_funds: 95 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should set 3% of fee when using debit_card', async () => {
    await sut.create({ ...entity, payment_method: CardEnum.DEBIT });
    const response = await request(app).get('/api/v1/dev/payable');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: { available: 97, waiting_funds: 0 },
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
  it('should return the transactions', async () => {
    await prismaService.transaction.create({
      data: { ...entity, cvv: parseInt(entity.cvv.toString()) },
    });
    const response = await request(app).get('/api/v1/dev/transaction');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      statusCode: 200,
      data: [
        {
          id: expect.any(Number),
          price: 100,
          description: 'Smartband XYZ 3.0',
          payment_method: 'debit_card',
          card_number: '*******8910',
          owner_name: 'matheus',
          card_expires_date: expect.any(String),
          cvv: 855,
        },
      ],
      timestamp: expect.any(String),
      method: 'GET',
    });
  });
});
