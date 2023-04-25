import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createHotelAndRoom, createTicketContext, createUser } from '../factories';
import { createBooking } from '../factories/booking-factory';
import describeRouteAuthentication from './common/route-authentication';
import app, { init } from '@/app';

const server = supertest(app);

beforeAll(async () => await init());
beforeEach(async () => await cleanDb());

describe('GET /booking', () => {
  describeRouteAuthentication('/booking', 'get');

  describe('when token is valid', () => {
    it('should respond with status 404 if user has no booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and user booking', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const { room } = await createHotelAndRoom();
      await createTicketContext(user);

      const { id } = await createBooking({ userId: user.id, roomId: room.id });

      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toMatchObject({ id, Room: room });
    });
  });
});

describe('POST /booking', () => {
  console.log('test here');
});

describe('PUT /booking/:bookingId', () => {
  console.log('test here');
});
