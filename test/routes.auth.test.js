process.env.NODE_ENV = 'development';
process.env.PORT = 1440;

// require the Koa server
const server = require('../api/server');
const request = require('supertest');
const models = require('../api/db/models');
// const umzug = require('./umzug');

beforeAll(async () => {
  models.sequelize.sync();
});

afterEach(async () => {
  // const down = await umzug.down({ to: 0 });
  // console.log(down);
  server.close();
});

describe('GET /auth/register', () => {
  test('should render the register view', async () => {
    const response = await request(server).get('/auth/register');

    expect(response.redirect).toEqual(false);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
    expect(response.text).toContain('<h1>Register</h1>');
    expect(response.text).toContain('<button type="submit">Register</button>');
  });
});

describe('POST /auth/register', () => {
  test('should register a new user', async () => {
    const users = await models.User.findAll();

    expect(users.length).toBe(0);

    const response = await request(server)
      .post('/auth/register')
      .send({
        email: 'michael',
        password: 'herman',
      });

    expect(response.redirect).toEqual(true);
  });

  test('should throw an error if a user already exists', async () => {
    const response = await request(server)
      .post('/auth/register')
      .send({
        email: 'michael',
        password: 'herman',
      });

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Validation error');
  });
});

describe('GET /auth/login', () => {
  test('should render the login view', async () => {
    const response = await request(server).get('/auth/login');

    expect(response.redirect).toEqual(false);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
    expect(response.text).toContain('<h1>Login</h1>');
    expect(response.text).toContain('<button type="submit">Log In</button>');
  });
});
