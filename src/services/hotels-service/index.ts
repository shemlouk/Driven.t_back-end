import hotelsRepository from '@/repositories/hotels-repository';

const getHotels = async () => {
  return await hotelsRepository.findAll();
};

const getHotelWithRooms = async (hotelId: number) => {
  return await hotelsRepository.findById(hotelId);
};

export const hotelsService = { getHotels, getHotelWithRooms };

export default hotelsService;
