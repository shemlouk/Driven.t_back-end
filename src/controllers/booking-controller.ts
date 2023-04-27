import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services';

export const getUserBooking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const [userBooking] = await bookingService.getUserBookings(req.userId);
    return res.send(userBooking);
  } catch (error) {
    next(error);
  }
};

export const bookRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { roomId } = req.body;
  try {
    const booking = await bookingService.createBooking(req.userId, roomId);
    return res.send(booking);
  } catch (error) {
    next(error);
  }
};

export const changeRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { userId } = req;
  const { roomId } = req.body;
  const id = Number(req.params.bookingId);
  try {
    const updatedBooking = await bookingService.updateRoom(id, userId, roomId);
    return res.send(updatedBooking);
  } catch (error) {
    next(error);
  }
};
