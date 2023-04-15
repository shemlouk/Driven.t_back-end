import { Enrollment, Payment, Prisma, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type TicketRelatedModels = Partial<{ Enrollment: Enrollment; TicketType: TicketType; Payment: Payment }>;
type TicketIncludeResult<T extends keyof TicketRelatedModels> = Ticket & Pick<TicketRelatedModels, T>;

const findTicketTypes = async () => {
  return prisma.ticketType.findMany();
};

type UserTicket = TicketIncludeResult<'TicketType'>;

const findTicketsFromUserId = async (userId: number): Promise<UserTicket[]> => {
  return prisma.ticket.findMany({
    where: { Enrollment: { userId } },
    include: { TicketType: true },
  });
};

const create = async (data: Prisma.TicketUncheckedCreateInput): Promise<UserTicket> => {
  return prisma.ticket.create({ data: data, include: { TicketType: true } });
};

type ExtendedTicket = TicketIncludeResult<'Enrollment' | 'Payment' | 'TicketType'>;

const findTicketById = async (id: number, include?: Prisma.TicketInclude): Promise<ExtendedTicket> => {
  const params: Prisma.TicketFindUniqueArgs = { where: { id } };
  if (include) params.include = include;
  return prisma.ticket.findUnique(params);
};

const updateTicketStatusById = async (id: number, status: TicketStatus) => {
  return prisma.ticket.update({ where: { id }, data: { status } });
};

const ticketsRepository = { findTicketTypes, findTicketsFromUserId, create, findTicketById, updateTicketStatusById };

export default ticketsRepository;
