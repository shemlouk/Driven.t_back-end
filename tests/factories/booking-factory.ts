import { Booking } from '@prisma/client';
import { prisma } from '@/config';

export const createBooking = async ({ userId, roomId }: Pick<Booking, 'userId' | 'roomId'>) => {
  return prisma.booking.create({ data: { userId, roomId } });
};
