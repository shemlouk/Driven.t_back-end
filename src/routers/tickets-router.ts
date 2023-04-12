import { Router } from 'express';
import { getTicketTypesList } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketTypesList);

export { ticketsRouter };
