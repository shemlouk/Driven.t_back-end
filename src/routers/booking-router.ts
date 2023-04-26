import { Router } from 'express';
import { authenticateToken, ticketValidationMiddleware, validateBody } from '@/middlewares';
import { bookRoom, getUserBooking } from '@/controllers';
import { bookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', ticketValidationMiddleware(), validateBody(bookingSchema), bookRoom)
  .put('/:bookingId');

export { bookingRouter };
