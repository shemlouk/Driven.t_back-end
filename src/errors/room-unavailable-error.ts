import { ApplicationError } from '@/protocols';

export const roomUnavailableError = (): ApplicationError => {
  return {
    name: 'RoomUnavailableError',
    message: 'Room is unavailable',
  };
};
