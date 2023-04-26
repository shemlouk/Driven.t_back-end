import bookingRepository from '@/repositories/booking-repository';
import { notFoundError, roomUnavailableError } from '@/errors';
import roomsRepository from '@/repositories/rooms-repository';

const getUserBookings = async (userId: number) => {
  const bookings = await bookingRepository.findByUserIdWithCustomSelection(userId, { id: true, Room: true });

  if (!bookings.length) throw notFoundError();

  return bookings;
};

const createBooking = async (userId: number, roomId: number) => {
  const room = await roomsRepository.findById(roomId);
  if (!room) throw notFoundError();

  const roomBookings = await bookingRepository.findByRoomId(roomId);
  if (room.capacity === roomBookings.length) throw roomUnavailableError();

  const { id } = await bookingRepository.create({ userId, roomId });

  return { bookingId: id };
};

export const bookingService = { getUserBookings, createBooking };

export default bookingService;
