import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

const findByTicketId = async (ticketId: number) => {
  return prisma.payment.findFirst({ where: { ticketId } });
};

const create = async (data: Prisma.PaymentUncheckedCreateInput) => {
  return prisma.payment.create({ data });
};

const paymentsRepository = { findByTicketId, create };

export default paymentsRepository;
