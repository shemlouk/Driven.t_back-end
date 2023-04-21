import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

type CreateTicketTypeParams = Partial<{ isRemote: boolean; includesHotel: boolean }>;

export async function createTicketType(options: CreateTicketTypeParams = {}) {
  const { isRemote, includesHotel } = options;

  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: isRemote ?? faker.datatype.boolean(),
      includesHotel: includesHotel ?? faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
