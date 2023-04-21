import hotelsRepository from '@/repositories/hotels-repository';

const getHotels = async () => {
  return await hotelsRepository.findAll();
};

export const hotelsService = { getHotels };

export default hotelsService;
