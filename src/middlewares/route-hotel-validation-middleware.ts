import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from './authentication-middleware';
import ticketsService from '@/services/tickets-service';

export const routeHotelValidationMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { userId } = req;

  try {
    const [userTicket] = await ticketsService.getAllTicketsFromUserId(userId);

    const isNotPaid = userTicket.status !== 'PAID';
    const isRemote = userTicket.TicketType.isRemote;
    const doesNotIncludesHotel = !userTicket.TicketType.includesHotel;

    if (isNotPaid || isRemote || doesNotIncludesHotel) return res.sendStatus(httpStatus.PAYMENT_REQUIRED);

    next();
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
