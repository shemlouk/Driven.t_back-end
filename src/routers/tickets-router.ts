import { Router } from 'express';
import { getTicketTypes, getUserTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/', getUserTickets).get('/types', getTicketTypes);

export { ticketsRouter };
