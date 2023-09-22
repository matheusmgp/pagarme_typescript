import { PrismaService } from '../../services';
import { ITransactionRepository } from '../interfaces/transaction-repository.interface';
import { TransactionEntity } from '../../../domain/entities';
import { injectable } from 'tsyringe';
import { Repository } from '../prisma.repository';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseError, DatabaseUnknowError } from '../../../shared/errors';

@injectable()
export class TransactionRepository extends Repository<TransactionEntity> implements ITransactionRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }
  async create(payload: TransactionEntity): Promise<any> {
    try {
      return await this.prismaService.transaction.create({
        data: { ...payload, cvv: parseInt(payload.cvv.toString()) },
      });
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAll(): Promise<any> {
    try {
      return await this.prismaService.transaction.findMany({
        orderBy: {
          id: 'desc',
        },
      });
    } catch (err: any) {
      this.handleError(err);
    }
  }

  protected handleError(err: any): void {
    if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
      throw new DatabaseError(`Can't reach database server.`, 'database closed');
    }
    throw new DatabaseUnknowError(`Houve um problema`, err.message);
  }
}
