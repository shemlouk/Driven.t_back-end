import Joi from 'joi';
import { CreateTicket } from '@/services/tickets-service';

type CreateTicketSchema = Pick<CreateTicket, 'ticketTypeId'>;

export const createTicketSchema = Joi.object<CreateTicketSchema>({
  ticketTypeId: Joi.number().positive().integer().required(),
});
