import { BaseEntity } from './base.entity';

export type PayableEntityProps = {
  transaction_id: number;
  amount: number;
  payment_date: Date;
  status: string;
  availability: string;
};
export class PayableEntity extends BaseEntity {
  transaction_id: number;
  amount: number;
  payment_date: Date;
  status: string;
  availability: string;
  constructor(props: PayableEntityProps) {
    super();
    this.transaction_id = props.transaction_id;
    this.amount = props.amount;
    this.payment_date = props.payment_date;
    this.status = props.status;
    this.availability = props.availability;
  }

  toJSON() {
    return {
      transaction_id: this.transaction_id,
      amount: this.amount,
      payment_date: this.payment_date,
      status: this.status,
      availability: this.availability,
    };
  }
  static createEntity = (props: PayableEntityProps) => {
    return new PayableEntity(props);
  };
}
