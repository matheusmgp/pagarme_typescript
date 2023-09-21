import { PayableEntity, PayableEntityProps } from '../../entities/payable.entity';
import { IPayableService } from '../interfaces/payable-service.interface';
import { inject, injectable } from 'tsyringe';
import { IPayableRepository } from '../../repositories/interfaces/payable-repository.interface';
import { PayableStatusEnum } from '../../utils/payable-status.enum';
import { DatabaseError, DatabaseUnknowError } from '../../errors/database-error';
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
  async create(payload: PayableEntity): Promise<PayableEntity | undefined> {
    logger.log('PayableService [CREATE]', payload);
    try {
      return await this.repository.create(payload);
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAll(): Promise<IPayables | undefined> {
    logger.log('PayableService [GETALL]');
    try {
      return {
        available: this.roundNumber(this.reduce(await this.repository.getAll(PayableStatusEnum.AVAILABLE))),
        waiting_funds: this.roundNumber(this.reduce(await this.repository.getAll(PayableStatusEnum.WAITING_FUNDS))),
      };
    } catch (err: any) {
      this.handleError(err);
    }
  }
  async getAllInfo(): Promise<PayableEntity[] | undefined> {
    logger.log('PayableService [GETALLINFO]');
    try {
      const payables = await this.repository.getAllInfo();
      payables.map((item: PayableEntity) => (item.amount = this.roundNumber(item.amount)));
      return payables;
    } catch (err: any) {
      this.handleError(err);
    }
  }
  reduce(array: PayableEntityProps[]): number {
    return array.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
  }
  protected handleError(err: any): void {
    if (err instanceof DatabaseError) {
      throw new DatabaseError(err.message, err.cause);
    }
    if (err instanceof DatabaseUnknowError) {
      throw new DatabaseUnknowError(`Houve um problema`, err.cause);
    }
    throw new BadRequestError(`Houve um problema`, err.cause);
  }

  roundNumber(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
