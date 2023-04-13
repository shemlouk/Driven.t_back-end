import { Ticket } from '@prisma/client';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';

const getAllTicketTypes = async () => {
  return await ticketsRepository.findTicketTypes();
};

const getAllTicketsFromUserId = async (userId: number) => {
  const ticketsList = await ticketsRepository.findTicketsFromUserId(userId);

  if (!ticketsList.length) throw notFoundError();

  return ticketsList;
};

export type CreateTicket = Pick<Ticket, 'ticketTypeId' | 'enrollmentId' | 'status'>;

const createTicket = async (userId: number, ticketTypeId: number) => {
  const { id: enrollmentId } = await enrollmentRepository.findWithAddressByUserId(userId);

  const data: CreateTicket = { enrollmentId, ticketTypeId, status: 'RESERVED' };

  return await ticketsRepository.create(data);
};

const ticketsService = { getAllTicketTypes, getAllTicketsFromUserId, createTicket };

export default ticketsService;
