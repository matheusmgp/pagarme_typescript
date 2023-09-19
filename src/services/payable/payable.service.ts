import { PayableEntity, PayableEntityProps } from '../../entities/payable.entity';
import { IPayableService } from '../interfaces/payable-service.interface';
import { inject, injectable } from 'tsyringe';
import { IPayableRepository } from '../../repositories/interfaces/payable-repository.interface';
import { PayableStatusEnum } from '../../utils/payable-status.enum';
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseError } from '../../errors/database-error';
import { BaseError } from '../../errors/base-error';

@injectable()
export class PayableService implements IPayableService {
  constructor(
    @inject('PayableRepository')
    private readonly repository: IPayableRepository
  ) {}
  async create(payload: PayableEntity): Promise<any> {
    try {
      return await this.repository.create(payload);
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
      throw new BaseError(`Houve um problema - ${err.message}`);
    }
  }
  async getAll(): Promise<any> {
    try {
      return {
        available: this.reduce(await this.repository.getAll(PayableStatusEnum.AVAILABLE)),
        waiting_funds: this.reduce(await this.repository.getAll(PayableStatusEnum.WAITING_FUNDS)),
      };
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
      throw new BaseError(`Houve um problema - ${err.message}`);
    }
  }
  async getAllInfo(): Promise<any> {
    try {
      return await this.repository.getAllInfo();
    } catch (err: any) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
      throw new BaseError(`Houve um problema - ${err.message}`);
    }
  }
  reduce(array: PayableEntityProps[]): any {
    return array.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
  }
}
