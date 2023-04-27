import bookingRepository from '@/repositories/booking-repository';
import { forbiddenError, notFoundError, roomUnavailableError } from '@/errors';
import roomsRepository from '@/repositories/rooms-repository';

const checkRoomAvailability = async (roomId: number) => {
  const room = await roomsRepository.findById(roomId);
  if (!room) throw notFoundError();
  const roomReservations = await bookingRepository.findByRoomId(roomId);
  if (room.capacity === roomReservations.length) throw roomUnavailableError();
};

const getUserBookings = async (userId: number) => {
  const bookings = await bookingRepository.findByUserIdWithCustomSelection(userId, { id: true, Room: true });
  if (!bookings.length) throw notFoundError();
  return bookings;
};

const createBooking = async (userId: number, roomId: number) => {
  await checkRoomAvailability(roomId);
  const { id } = await bookingRepository.create({ userId, roomId });
  return { bookingId: id };
};

const updateRoom = async (bookingId: number, userId: number, roomId: number) => {
  const userHasBooking = await bookingRepository.findByUserId(userId);
  if (!userHasBooking) throw forbiddenError();

  await checkRoomAvailability(roomId);

  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw notFoundError();
  if (booking.userId !== userId) throw forbiddenError();

  const { id } = await bookingRepository.updateRoomId(bookingId, roomId);
  return { bookingId: id };
};

export const bookingService = { getUserBookings, createBooking, updateRoom };

export default bookingService;
