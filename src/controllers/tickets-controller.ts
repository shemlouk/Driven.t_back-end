import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export const getTicketTypesList = async (_req: Request, res: Response) => {
  try {
    const ticketsTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
};
