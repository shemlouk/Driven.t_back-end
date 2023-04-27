import { ApplicationError } from '@/protocols';

export const forbiddenError = (): ApplicationError => {
  return {
    name: 'ForbiddenError',
    message: "Can't access resource with credentials",
  };
};
