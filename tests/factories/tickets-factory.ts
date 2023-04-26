import faker from '@faker-js/faker';
import { TicketStatus, User } from '@prisma/client';
import { createEnrollmentWithAddress } from './enrollments-factory';
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

export async function createTicketTypeRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

type TicketTypeConfigParam = Partial<{ isRemote: boolean; includesHotel: boolean; status: TicketStatus }>;

const defaultConfigParam = { isRemote: false, includesHotel: true, status: TicketStatus.PAID };

export const createTicketContext = async (
  user: User,
  config: TicketTypeConfigParam = defaultConfigParam,
): Promise<void> => {
  const { isRemote = false, includesHotel = true, status = TicketStatus.PAID } = config;

  const { id: enrollmentId } = await createEnrollmentWithAddress(user);
  const { id: ticketTypeId } = await createTicketType({ isRemote, includesHotel });

  await createTicket(enrollmentId, ticketTypeId, status);
};
