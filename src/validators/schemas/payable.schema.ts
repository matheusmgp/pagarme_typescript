import Joi from 'joi';

export const payableSchema = Joi.object({
  transaction_id: Joi.number().required(),
  amount: Joi.number().required(),
  status: Joi.string().required(),
  availability: Joi.string().required(),
  payment_date: Joi.date().required(),
});
