import httpStatus from 'http-status';
import { Response } from 'express';
import hotelsService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

export const getHotels = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const hotels = await hotelsService.getHotels();
    if (!hotels.length) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export const getRoomsFromHotel = async (req: AuthenticatedRequest, res: Response) => {
  const { hotelId } = req.params;
  try {
    const hotelWithRooms = await hotelsService.getHotelWithRooms(+hotelId);
    if (!hotelWithRooms) return res.sendStatus(httpStatus.NOT_FOUND);
    return res.send(hotelWithRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
