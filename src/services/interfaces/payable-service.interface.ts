import { PayableEntity, PayableEntityProps } from '../../entities/payable.entity';
import { IPayables } from './payables.interface';

export interface IPayableService {
  create(payload: PayableEntity): Promise<PayableEntity>;
  getAll(): Promise<IPayables>;
  getAllInfo(): Promise<PayableEntity[]>;
  reduce(array: PayableEntityProps[]): number;
}
