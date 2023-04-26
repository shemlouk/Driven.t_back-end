import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services';

export const getUserBooking = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const [userBooking] = await bookingService.getUserBookings(Number(req.userId));
    return res.send(userBooking);
  } catch (error) {
    next(error);
  }
};
