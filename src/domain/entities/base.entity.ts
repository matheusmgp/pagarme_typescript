export abstract class BaseEntity {
  id?: number;
  constructor(id?: number) {
    this.id = id;
  }
  toJSON(): any {}
  static createEntity(props: any) {}
}
