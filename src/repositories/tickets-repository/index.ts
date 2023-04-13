import { Prisma, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

const findTicketTypes = async () => {
  return prisma.ticketType.findMany();
};

type UserTicket = Ticket & { TicketType: TicketType };

const findTicketsFromUserId = async (userId: number): Promise<UserTicket[]> => {
  return prisma.ticket.findMany({
    where: { Enrollment: { userId } },
    include: { TicketType: true },
  });
};

const create = async (data: Prisma.TicketUncheckedCreateInput): Promise<UserTicket> => {
  return prisma.ticket.create({ data: data, include: { TicketType: true } });
};

const ticketsRepository = { findTicketTypes, findTicketsFromUserId, create };

export default ticketsRepository;
