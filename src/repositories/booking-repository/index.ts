import { Booking, Prisma, Room, User } from '@prisma/client';
import { prisma } from '@/config';

type UserBooking = Partial<Booking> & { Room?: Partial<Room>; User?: Partial<User> };

const findByUserIdWithCustomSelection = async (
  userId: number,
  select: Prisma.BookingSelect,
): Promise<UserBooking[]> => {
  return prisma.booking.findMany({ where: { userId }, select });
};

const bookingRepository = { findByUserIdWithCustomSelection };

export default bookingRepository;
