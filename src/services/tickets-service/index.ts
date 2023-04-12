import ticketsRepository from '@/repositories/tickets-repository';

const getAllTicketTypes = async () => {
  return await ticketsRepository.findAllTicketTypes();
};

const ticketsService = { getAllTicketTypes };

export default ticketsService;
