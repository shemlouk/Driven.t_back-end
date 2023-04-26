import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';

const getUserBookings = async (userId: number) => {
  const bookings = await bookingRepository.findByUserIdWithCustomSelection(userId, { id: true, Room: true });

  if (!bookings.length) throw notFoundError();

  return bookings;
};

export const bookingService = { getUserBookings };

export default bookingService;
