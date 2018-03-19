process.env.NODE_ENV = 'development';
process.env.PORT = 1440;

// require the Koa server
const server = require('../api/server');
const request = require('supertest');
const models = require('../api/db/models');

afterEach(async () => {
  server.close();
});

describe('GET /auth/register', () => {
  test('should render the register view', async () => {
    const response = await request(server).get('/auth/register');

    expect(response.redirects.length).toEqual(0);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
    expect(response.text).toContain('<h1>Register</h1>');
    expect(response.text).toContain('<button type="submit">Register</button>');
  });
});

describe('POST /auth/register', () => {
  test('should register a new user', async () => {
    const response = await request(server)
      .post('/auth/register')
      .send({
        email: 'michael',
        password: 'herman',
      });

    expect(response.redirect).toEqual(true);
  });
});
