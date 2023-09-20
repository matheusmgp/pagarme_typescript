import { PayableEntity, PayableEntityProps } from '../../entities/payable.entity';
import { IPayableService } from '../interfaces/payable-service.interface';
import { inject, injectable } from 'tsyringe';
import { IPayableRepository } from '../../repositories/interfaces/payable-repository.interface';
import { PayableStatusEnum } from '../../utils/payable-status.enum';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseError } from '../../errors/database-error';
import { IPayables } from '../interfaces/payables.interface';
import { BadRequestError } from '../../errors/bad-request-error';
import Logger from '../../logger/logger';
const logger = Logger.getInstance();
@injectable()
export class PayableService implements IPayableService {
  constructor(
    @inject('PayableRepository')
    private readonly repository: IPayableRepository
  ) {}
  async create(payload: PayableEntity): Promise<PayableEntity> {
    logger.log('PayableService [CREATE]', payload);
    try {
      return await this.repository.create(payload);
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server.`, 'database closed');
      }
      throw new BadRequestError(`Houve um problema`, err.message);
    }
  }
  async getAll(): Promise<IPayables> {
    logger.log('PayableService [GETALL]');
    try {
      return {
        available: this.reduce(await this.repository.getAll(PayableStatusEnum.AVAILABLE)),
        waiting_funds: this.reduce(await this.repository.getAll(PayableStatusEnum.WAITING_FUNDS)),
      };
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server.`, 'database closed');
      }
      throw new BadRequestError(`Houve um problema`, err.message);
    }
  }
  async getAllInfo(): Promise<PayableEntity[]> {
    logger.log('PayableService [getAllInfo]');
    try {
      return await this.repository.getAllInfo();
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server.`, 'database closed');
      }
      throw new BadRequestError(`Houve um problema`, err.message);
    }
  }
  reduce(array: PayableEntityProps[]): number {
    return array.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
  }
}
