import { Router } from 'express';
import Joi from 'joi';
import { authenticateToken, routeHotelValidationMiddleware, validateParams } from '@/middlewares';
import { getHotels, getRoomsFromHotel } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken, routeHotelValidationMiddleware)
  .get('/', getHotels)
  .get(
    '/:hotelId',
    validateParams(Joi.object({ hotelId: Joi.number().integer().positive().required() })),
    getRoomsFromHotel,
  );

export { hotelsRouter };
