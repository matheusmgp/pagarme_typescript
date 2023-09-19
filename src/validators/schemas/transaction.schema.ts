import { CardEnum } from '../../utils/card.enum';
import Joi from 'joi';

export const transactionSchema = Joi.object({
  price: Joi.number().required(),
  description: Joi.string().max(30).required(),
  payment_method: Joi.string().valid(CardEnum.CREDIT, CardEnum.DEBIT).required(),
  card_number: Joi.string().max(45).required(),
  owner_name: Joi.string().max(45).required(),
  card_expires_date: Joi.date().required(),
  cvv: Joi.number().required(),
});
