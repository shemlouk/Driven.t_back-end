import httpStatus from 'http-status';
import { Response } from 'express';
import hotelsService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

export const getHotels = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const hotels = await hotelsService.getHotels();
    return res.send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
