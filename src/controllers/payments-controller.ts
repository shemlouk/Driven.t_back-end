import httpStatus from 'http-status';
import { Response } from 'express';
import paymentsService from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';

export const getTicketPaymentDetails = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const paymentDetails = await paymentsService.getPaymentByTicketId(ticketId, userId);
    return res.send(paymentDetails);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};

export const createPayment = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  try {
    const createdPayment = await paymentsService.createPayment(userId, req.body);
    res.send(createdPayment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};
