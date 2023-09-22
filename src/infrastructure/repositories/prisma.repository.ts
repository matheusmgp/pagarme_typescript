import { IBaseRepository, WithId } from './interfaces/base-repository.interface';

export abstract class Repository<T> implements IBaseRepository<T> {
  public abstract create(payload: T): Promise<WithId<any>>;
}
