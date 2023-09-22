import { PayableEntity, PayableEntityProps } from '../../../domain';
import { IPayables } from './payables.interface';

export interface IPayableService {
  create(payload: PayableEntity): Promise<PayableEntity | undefined>;
  getAll(): Promise<IPayables | undefined>;
  getAllInfo(): Promise<PayableEntity[] | undefined>;
  reduce(array: PayableEntityProps[]): number;
  roundNumber(value: number): number;
}
