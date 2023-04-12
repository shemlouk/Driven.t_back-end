import { prisma } from '@/config';

const findAllTicketTypes = async () => {
  return prisma.ticketType.findMany();
};

const ticketsRepository = { findAllTicketTypes };

export default ticketsRepository;
