import Joi from 'joi';

export const createTicketSchema = Joi.object({
  ticketTypeId: Joi.number().positive().integer().required(),
});
