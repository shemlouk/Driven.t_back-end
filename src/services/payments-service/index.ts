import ticketsService from '../tickets-service';
import paymentsRepository from '@/repositories/payments-repository';
import { notFoundError, unauthorizedError } from '@/errors';

const getPaymentByTicketId = async (ticketId: number, userId: number) => {
  const ticket = await ticketsService.getTicketByIdWithEnrollment(ticketId);

  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return await paymentsRepository.findByTicketId(ticketId);
};

const paymentsService = { getPaymentByTicketId };

export default paymentsService;
