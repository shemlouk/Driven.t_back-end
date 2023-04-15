import Joi from 'joi';
import { CreatePaymentPayload } from '@/services/payments-service';

export const createPaymentSchema = Joi.object<CreatePaymentPayload>({
  ticketId: Joi.number().integer().positive(),
  cardData: Joi.object({
    issuer: Joi.string(),
    number: Joi.number().integer().positive(),
    name: Joi.string(),
    expirationDate: Joi.string(),
    cvv: Joi.number(),
  })
    .options({ presence: 'required' })
    .required(),
})
  .options({ presence: 'required' })
  .required();
