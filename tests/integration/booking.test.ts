import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { createHotelAndRoom, createTicketContext, createUserAndToken } from '../factories';
import { createBooking } from '../factories/booking-factory';
import { testPayloadValidation, testRouteAuthentication, testTicketValidation } from './common';
import app, { init } from '@/app';

const server = supertest(app);

beforeAll(async () => await init());
beforeEach(async () => await cleanDb());

describe('GET /booking', () => {
  testRouteAuthentication('/booking', 'get');

  describe('when token is valid', () => {
    it('should respond with status 404 if user has no booking', async () => {
      const { token } = await createUserAndToken();
      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and user booking', async () => {
      const { user, token } = await createUserAndToken();
      const { room } = await createHotelAndRoom();
      await createTicketContext(user);

      delete room.updatedAt;
      delete room.createdAt;

      const { id } = await createBooking({ userId: user.id, roomId: room.id });
      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toMatchObject({ id, Room: room });
    });
  });
});

describe('POST /booking', () => {
  testRouteAuthentication('/booking', 'post');

  describe('when token is valid', () => {
    testTicketValidation('/booking', 'post', httpStatus.FORBIDDEN);

    describe('when ticket is valid', () => {
      testPayloadValidation('/booking', 'post');

      describe('when payload is valid', () => {
        it('should respond with status 404 if room is not found', async () => {
          const { user, token } = await createUserAndToken();
          await createTicketContext(user);
          const { room } = await createHotelAndRoom();
          const payload = { roomId: room.id + 1 };
          const response = await server.post('/booking').send(payload).set('Auhtorization', `Bearer ${token}`);
          expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and with the booking id', async () => {
          const { user, token } = await createUserAndToken();
          await createTicketContext(user);
          const { room } = await createHotelAndRoom();
          const payload = { roomId: room.id };
          const response = await server.post('/booking').send(payload).set('Authorization', `Bearer ${token}`);
          expect(response.status).toBe(httpStatus.OK);
          expect(response.body).toMatchObject({ bookingId: expect.any(Number) });
        });

        it('should respond with status 403 if room is not available', async () => {
          const { room } = await createHotelAndRoom({ capacity: 1 });
          const payload = { roomId: room.id };

          const { user, token } = await createUserAndToken();
          await createTicketContext(user);
          await server.post('/booking').send(payload).set('Auhtorization', `Bearer ${token}`);

          const { user: anotherUser, token: tokenFromAnotherUser } = await createUserAndToken();
          await createTicketContext(anotherUser);
          const response = await server
            .post('/booking')
            .send(payload)
            .set('Auhtorization', `Bearer ${tokenFromAnotherUser}`);

          expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
      });
    });
  });
});

describe('PUT /booking/:bookingId', () => {
  console.log('awaiting tests');
});
