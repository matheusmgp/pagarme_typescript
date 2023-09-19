import { BaseEntity } from './base.entity';

export type TransactionEntityProps = {
  price: number;
  description: string;
  payment_method: string;
  card_number: string;
  owner_name: string;
  card_expires_date: Date;
  cvv: number | string;
};
export class TransactionEntity extends BaseEntity {
  price: number;
  description: string;
  payment_method: string;
  card_number: string;
  owner_name: string;
  card_expires_date: Date;
  cvv: number | string;
  constructor(props: TransactionEntityProps) {
    super();
    this.price = props.price;
    this.description = props.description;
    this.payment_method = props.payment_method;
    this.card_number = props.card_number;
    this.owner_name = props.owner_name;
    this.card_expires_date = props.card_expires_date;
    this.cvv = props.cvv;
    this.maskCardNumber();
  }
  toJSON(): any {
    return {
      price: this.price,
      description: this.description,
      payment_method: this.payment_method,
      card_number: this.card_number,
      owner_name: this.owner_name,
      card_expires_date: this.card_expires_date,
      cvv: this.cvv,
    };
  }
  maskCardNumber(): void {
    this.card_number = '*'.repeat(this.card_number.length - 4) + this.card_number.slice(-4);
  }
  static createEntity = (props: TransactionEntityProps): TransactionEntity => {
    return new TransactionEntity(props);
  };
}
