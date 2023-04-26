import { TicketStatus } from '@prisma/client';
import supertest from 'supertest';
import { createUser, createTicketContext } from '../../factories';
import { generateValidToken } from '../../helpers';
import { HttpMethod } from './route-authentication';
import app from '@/app';

const server = supertest(app);

const describeTicketValidation = async (route: string, method: HttpMethod, statusCode: number) => {
  describe('when ticket is invalid', () => {
    it(`should respond with status ${statusCode} if ticket is not paid`, async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createTicketContext(user, { status: TicketStatus.RESERVED });

      const response = await server[method](route).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(statusCode);
    });

    it(`should respond with status ${statusCode} if ticket is remote`, async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createTicketContext(user, { isRemote: true });

      const response = await server[method](route).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(statusCode);
    });

    it(`should respond with status ${statusCode} if ticket does not includes hotel`, async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createTicketContext(user, { includesHotel: false });

      const response = await server[method](route).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(statusCode);
    });
  });
};

export default describeTicketValidation;
