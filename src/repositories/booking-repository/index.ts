import { Booking, Prisma, Room, User } from '@prisma/client';
import { prisma } from '@/config';

type UserBooking = Partial<Booking> & { Room?: Partial<Room>; User?: Partial<User> };

const findByUserIdWithCustomSelection = async (
  userId: number,
  select: Prisma.BookingSelect,
): Promise<UserBooking[]> => {
  return prisma.booking.findMany({ where: { userId }, select });
};

const create = async (data: Prisma.BookingUncheckedCreateInput) => {
  return prisma.booking.create({ data });
};

const findByRoomId = async (roomId: number) => {
  return prisma.booking.findMany({ where: { roomId } });
};

const findByUserId = async (userId: number) => {
  return prisma.booking.findFirst({ where: { userId } });
};

const findById = async (id: number) => {
  return prisma.booking.findUnique({ where: { id } });
};

const updateRoomId = async (id: number, roomId: number) => {
  return prisma.booking.update({ where: { id }, data: { roomId } });
};

const bookingRepository = {
  findByUserIdWithCustomSelection,
  create,
  findByRoomId,
  updateRoomId,
  findById,
  findByUserId,
};

export default bookingRepository;
