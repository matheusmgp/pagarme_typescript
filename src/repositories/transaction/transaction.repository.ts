import { PrismaService } from '../../services/prisma/prisma.service';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { TransactionEntity } from '../../entities/transaction.entity';
import { injectable } from 'tsyringe';

@injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(payload: TransactionEntity): Promise<any> {
    return await this.prismaService.transaction.create({
      data: { ...payload, cvv: parseInt(payload.cvv.toString()) },
    });
  }
  async getAll(): Promise<any> {
    return await this.prismaService.transaction.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }
}
