import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUserAndToken } from '../../factories';
import { HttpMethod } from './route-authentication';
import app from '@/app';

const server = supertest(app);

export const testPayloadValidation = async (route: string, method: HttpMethod) => {
  it('should respond with status 400 if no payload is sent', async () => {
    const { token } = await createUserAndToken();
    const response = await server[method](route).set('Auhtorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 if invalid payload is sent', async () => {
    const { token } = await createUserAndToken();
    const invalidPayload = { invalid: 'invalid' };
    const response = await server[method](route).send(invalidPayload).set('Auhtorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
};
