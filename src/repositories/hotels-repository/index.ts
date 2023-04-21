import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

const findAll = async () => {
  return prisma.hotel.findMany();
};

export type HotelWithRooms = Hotel & { Rooms: Room[] };

const findById = async (id: number): Promise<HotelWithRooms> => {
  return prisma.hotel.findUnique({ where: { id }, include: { Rooms: true } });
};

const hotelsRepository = { findAll, findById };

export default hotelsRepository;
