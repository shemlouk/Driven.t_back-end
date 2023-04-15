import { Payment } from '@prisma/client';
import ticketsService from '../tickets-service';
import paymentsRepository from '@/repositories/payments-repository';
import { notFoundError, unauthorizedError } from '@/errors';

const checkTicketAndReturnIfValid = async (ticketId: number, userId: number) => {
  const ticket = await ticketsService.getExtendedTicketById(ticketId);

  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  return ticket;
};

const getPaymentByTicketId = async (ticketId: number, userId: number) => {
  await checkTicketAndReturnIfValid(ticketId, userId);
  return await paymentsRepository.findByTicketId(ticketId);
};

export type CreatePaymentPayload = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

type CreatePayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const createPayment = async (userId: number, { ticketId, cardData }: CreatePaymentPayload) => {
  const { TicketType } = await checkTicketAndReturnIfValid(ticketId, userId);
  const { issuer, number } = cardData;

  const data: CreatePayment = {
    ticketId,
    value: TicketType.price,
    cardIssuer: issuer,
    cardLastDigits: String(number).slice(-4),
  };

  const createdPayment = await paymentsRepository.create(data);
  await ticketsService.updateTicketStatusToPaid(ticketId);

  return createdPayment;
};

const paymentsService = { getPaymentByTicketId, createPayment };

export default paymentsService;
