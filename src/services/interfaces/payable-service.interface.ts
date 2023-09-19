import { PayableEntity, PayableEntityProps } from '../../entities/payable.entity';

export interface IPayableService {
  create(payload: PayableEntity): Promise<any>;
  getAll(): Promise<any>;
  getAllInfo(): Promise<any>;
  reduce(array: PayableEntityProps[]): any;
}
