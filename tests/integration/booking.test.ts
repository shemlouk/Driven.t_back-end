import supertest from 'supertest';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

const api = supertest(app);

beforeAll(async () => await init());
beforeEach(async () => await cleanDb());

describe('GET /booking', () => {
  console.log('test here');
});

describe('POST /booking', () => {
  console.log('test here');
});

describe('PUT /booking/:bookingId', () => {
  console.log('test here');
});
