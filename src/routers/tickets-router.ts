import { Router } from 'express';
import { createTicket, getTicketTypes, getUserTickets } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getUserTickets)
  .get('/types', getTicketTypes)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
