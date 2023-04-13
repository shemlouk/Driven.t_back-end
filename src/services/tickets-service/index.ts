import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

const getAllTicketTypes = async () => {
  return await ticketsRepository.findAllTicketTypes();
};

const getAllTicketsFromUserId = async (userId: number) => {
  const ticketsList = await ticketsRepository.findAllTicketsFromUserId(userId);
  if (!ticketsList.length) throw notFoundError();
  return ticketsList;
};

const ticketsService = { getAllTicketTypes, getAllTicketsFromUserId };

export default ticketsService;
