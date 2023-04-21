import { prisma } from '@/config';

const findAll = async () => {
  return prisma.hotel.findMany();
};

const hotelsRepository = { findAll };

export default hotelsRepository;
