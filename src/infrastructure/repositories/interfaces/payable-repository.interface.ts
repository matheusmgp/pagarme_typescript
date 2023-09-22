import { PayableEntity } from '../../../domain/entities';
import { IBaseRepository } from './base-repository.interface';

export interface IPayableRepository extends IBaseRepository<PayableEntity> {
  getAll(availability: string): Promise<any>;
  getAllInfo(): Promise<any>;
}
