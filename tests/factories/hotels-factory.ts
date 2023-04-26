import { Hotel, Room } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export const createHotel = async (params: Partial<Hotel> = {}): Promise<Hotel> => {
  const { name = faker.company.companyName(), image = faker.image.imageUrl() } = params;
  return prisma.hotel.create({ data: { name, image } });
};

export const createRoom = async (hotelId: number, params: Partial<Room> = {}): Promise<Room> => {
  const { name = faker.lorem.word(), capacity = Number(faker.random.numeric(1, { bannedDigits: ['0'] })) } = params;
  return prisma.room.create({ data: { name, capacity, hotelId } });
};

export const createHotelAndRoom = async () => {
  const hotel = await createHotel();
  const room = await createRoom(hotel.id);
  return { hotel, room };
};
