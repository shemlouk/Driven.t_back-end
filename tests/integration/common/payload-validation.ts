import httpStatus from 'http-status';
import supertest from 'supertest';
import { createTicketContext, createUserAndToken } from '../../factories';
import { HttpMethod } from './route-authentication';
import app from '@/app';

const server = supertest(app);

export const testPayloadValidation = async (route: string, method: HttpMethod) => {
  it('should respond with status 400 if no payload is sent', async () => {
    const { user, token } = await createUserAndToken();
    await createTicketContext(user);
    const response = await server[method](route).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if invalid payload is sent', async () => {
    const { user, token } = await createUserAndToken();
    await createTicketContext(user);
    const invalidPayload = { invalid: 'invalid' };
    const response = await server[method](route).send(invalidPayload).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
};
