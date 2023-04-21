import { Hotel, TicketStatus, User } from '@prisma/client';
import httpStatus from 'http-status';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { generateValidToken, cleanDb } from '../helpers';
import {
  createEnrollmentWithAddress,
  createHotel,
  createRoom,
  createTicket,
  createTicketType,
  createUser,
} from '../factories';
import app, { init } from '@/app';

beforeEach(async () => await cleanDb());
afterAll(async () => await cleanDb());
beforeAll(async () => await init());

const server = supertest(app);

type TicketTypeConfigParam = Partial<{ isRemote: boolean; includesHotel: boolean; status: TicketStatus }>;

const defaultConfigParam = { isRemote: false, includesHotel: true, status: TicketStatus.PAID };

const createTicketContext = async (user: User, config: TicketTypeConfigParam = defaultConfigParam): Promise<void> => {
  const { isRemote = false, includesHotel = true, status = TicketStatus.PAID } = config;

  const { id: enrollmentId } = await createEnrollmentWithAddress(user);
  const { id: ticketTypeId } = await createTicketType({ isRemote, includesHotel });

  await createTicket(enrollmentId, ticketTypeId, status);
};

const createHotelAndRoom = async () => {
  const { id: hotelId } = await createHotel();
  await createRoom(hotelId);
};

describe('GET /hotels', () => {
  it('Should respond with status 401 if no token is sent', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should respond with status 401 if token sent is not valid', async () => {
    const response = await server.get('/hotels').set('Authorization', 'invalid-token');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should respond with status 401 if there is no session for token sent', async () => {
    const { id: userId } = await createUser();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('Should respond with status 404 if user has no ticket', async () => {
      const token = await generateValidToken();

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should respond with status 402 if ticket is not paid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      await createTicketContext(user, { status: TicketStatus.RESERVED });

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should respond with status 402 if ticket is remote', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      await createTicketContext(user, { isRemote: true });

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    it('Should respond with status 402 if ticket does not includes hotel', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      await createTicketContext(user, { includesHotel: false });

      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });

    describe('When ticket is valid', () => {
      it('Should respond with status 200 and with a list of hotels', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        await createHotelAndRoom();
        await createTicketContext(user);

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.arrayContaining<Hotel>([]));
      });
    });
  });
});
