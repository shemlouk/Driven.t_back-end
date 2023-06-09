import { Hotel } from '@prisma/client';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { generateValidToken, cleanDb } from '../helpers';
import { createTicketContext, createHotelAndRoom, createUser, createUserAndToken } from '../factories';
import { testRouteAuthentication, testTicketValidation } from './common';
import app, { init } from '@/app';
import { HotelWithRooms } from '@/repositories/hotels-repository';

beforeAll(async () => await init());
beforeEach(async () => await cleanDb());

const server = supertest(app);

describe('GET /hotels', () => {
  testRouteAuthentication('/hotels', 'get');

  describe('when token is valid', () => {
    it('should respond with status 404 if user has no ticket', async () => {
      const token = await generateValidToken();
      const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    testTicketValidation('/hotels', 'get', httpStatus.PAYMENT_REQUIRED);

    describe('when ticket is valid', () => {
      it('should respond with status 404 if there is no hotels', async () => {
        const { user, token } = await createUserAndToken();
        await createTicketContext(user);
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 200 and with a list of hotels', async () => {
        const { user, token } = await createUserAndToken();
        await createHotelAndRoom();
        await createTicketContext(user);
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.arrayContaining<Hotel>([]));
      });
    });
  });
});

describe('GET /hotels/:hotelId', () => {
  testRouteAuthentication('/hotels/0', 'get');

  describe('when token is valid', () => {
    it('should respond with status 404 if user has no ticket', async () => {
      const token = await generateValidToken();
      const response = await server.get('/hotels/0').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    testTicketValidation('/hotels/0', 'get', httpStatus.PAYMENT_REQUIRED);

    describe('when ticket is valid', () => {
      it('should respond with status 400 if hotel id sent is invalid', async () => {
        const { user, token } = await createUserAndToken();
        await createTicketContext(user);
        const response = await server.get('/hotels/invalid-hotel-id').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

      it('should respond with status 404 if hotel does not exists', async () => {
        const { user, token } = await createUserAndToken();
        const { hotel } = await createHotelAndRoom();
        await createTicketContext(user);
        const response = await server.get(`/hotels/${hotel.id + 1}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 200 and with a list of hotels with rooms', async () => {
        const { user, token } = await createUserAndToken();
        const { hotel } = await createHotelAndRoom();
        await createTicketContext(user);
        const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.arrayContaining<HotelWithRooms>([]));
      });
    });
  });
});
