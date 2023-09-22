import { IPayableRepository } from '../interfaces/payable-repository.interface';
import { PrismaService } from '../../services/prisma/prisma.service';
import { injectable } from 'tsyringe';
import { Repository } from '../prisma.repository';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseError, DatabaseUnknowError } from '../../errors/database-error';
import { PayableEntity } from '@src/entities/payable.entity';
@injectable()
export class PayableRepository extends Repository<PayableEntity> implements IPayableRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }
  async create(payload: PayableEntity): Promise<any> {
    try {
      return await this.prismaService.payable.create({
        data: payload,
      });
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAll(availability: string): Promise<any> {
    try {
      return await this.prismaService.payable.findMany({
        where: {
          availability,
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAllInfo(): Promise<any> {
    try {
      return await this.prismaService.payable.findMany({
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
