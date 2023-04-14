import { prisma } from '@/config';

const findByTicketId = async (ticketId: number) => {
  return prisma.payment.findFirst({ where: { ticketId } });
};

const paymentsRepository = { findByTicketId };

export default paymentsRepository;
