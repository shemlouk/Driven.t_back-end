import { Router } from 'express';
import { getTicketPaymentDetails } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getTicketPaymentDetails);

export { paymentsRouter };
