export type WithId<T> = { id: string } & T;
export interface IBaseRepository<T> {
  create(payload: T): Promise<WithId<any>>;
}
