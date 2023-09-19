import { PayableEntity } from '../../entities/payable.entity';

export interface IPayableRepository {
  create(payload: PayableEntity): Promise<any>;
  getAll(availability: string): Promise<any>;
  getAllInfo(): Promise<any>;
}
