import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export const getTicketTypes = async (_req: Request, res: Response) => {
  try {
    const ticketsTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
};

export const getUserTickets = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req;
  try {
    const userTickets = await ticketsService.getAllTicketsFromUserId(userId);
    const [firstTicket] = userTickets;
    return res.status(httpStatus.OK).send(firstTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
  const {
    userId,
    body: { ticketTypeId },
  } = req;
  try {
    const ticketCreated = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticketCreated);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};
