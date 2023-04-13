import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

const findAllTicketTypes = async () => {
  return prisma.ticketType.findMany();
};

type UserTicket = Ticket & { TicketType: TicketType };

const findAllTicketsFromUserId = async (userId: number): Promise<UserTicket[]> => {
  return prisma.ticket.findMany({
    where: { Enrollment: { userId } },
    include: { TicketType: true },
  });
};

const ticketsRepository = { findAllTicketTypes, findAllTicketsFromUserId };

export default ticketsRepository;
