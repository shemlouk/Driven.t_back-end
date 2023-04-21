import { Router } from 'express';
import { authenticateToken, routeHotelValidationMiddleware } from '@/middlewares';
import { getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken, routeHotelValidationMiddleware).get('/', getHotels);

export { hotelsRouter };
