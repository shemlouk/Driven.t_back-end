import { Router } from 'express';
import { authenticateToken, ticketValidationMiddleware, validateBody, validateParams } from '@/middlewares';
import { bookRoom, changeRoom, getUserBooking } from '@/controllers';
import { bookingParamSchema, bookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .all('/*', ticketValidationMiddleware(), validateBody(bookingSchema))
  .post('/', bookRoom)
  .put('/:bookingId', validateParams(bookingParamSchema), changeRoom);

export { bookingRouter };
