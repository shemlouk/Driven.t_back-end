import { prisma } from '@/config';

const updateCapacity = async (id: number, operation: 'increment' | 'decrement') => {
  const capacity: { [key: string]: number } = {};
  capacity[operation] = 1;
  return prisma.room.update({ where: { id }, data: { capacity } });
};

const findById = async (id: number) => {
  return prisma.room.findUnique({ where: { id } });
};

const roomsRepository = { updateCapacity, findById };

export default roomsRepository;
