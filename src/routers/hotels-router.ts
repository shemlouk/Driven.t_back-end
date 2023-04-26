import { Router } from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';
import { authenticateToken, ticketValidationMiddleware, validateParams } from '@/middlewares';
import { getHotels, getRoomsFromHotel } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken, ticketValidationMiddleware(httpStatus.PAYMENT_REQUIRED))
  .get('/', getHotels)
  .get(
    '/:hotelId',
    validateParams(Joi.object({ hotelId: Joi.number().integer().positive().required() })),
    getRoomsFromHotel,
  );

export { hotelsRouter };
