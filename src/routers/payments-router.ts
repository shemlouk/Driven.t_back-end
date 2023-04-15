import { Router } from 'express';
import { createPayment, getTicketPaymentDetails } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getTicketPaymentDetails)
  .post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
