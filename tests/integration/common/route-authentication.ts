import httpStatus from 'http-status';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { createUser } from '../../factories';
import app from '@/app';

const server = supertest(app);

type HttpMethod = 'get' | 'post' | 'put' | 'patch';

const describeRouteAuthentication = (route: string, method: HttpMethod) => {
  describe('when authorization is invalid', () => {
    it('should respond with status 401 if no token is sent', async () => {
      const response = await server[method](route);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if token sent is not valid', async () => {
      const response = await server[method](route).set('Authorization', 'invalid-token');
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for the token sent', async () => {
      const { id: userId } = await createUser();
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      const response = await server[method](route).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
};

export default describeRouteAuthentication;
