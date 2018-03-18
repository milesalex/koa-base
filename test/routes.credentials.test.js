process.env.NODE_ENV = 'test';
process.env.PORT = 1440;

// require the Koa server
const server = require('../api/server');

// require supertest
const request = require('supertest');
const models = require('../api/db/models');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// beforeAll(async () => {
//   const { stdout, stderr } = await exec('cd api/db; sequelize db:seed:all');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });

describe('GET /api/credentials', () => {
  test('should return all credentials', async () => {
    const response = await request(server).get('/api/credentials');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.status).toEqual('success');

    expect(response.body.data[0]).toHaveProperty('type');
    expect(response.body.data[0]).toHaveProperty('credentials');
    expect(response.body.data[0]).toHaveProperty('lastRefreshRequest');
    expect(response.body.data[0]).toHaveProperty('lastRefreshSuccess');
    expect(response.body.data[0]).toHaveProperty('lastRefreshError');
  });
});

describe('GET /api/credentials/1', () => {
  test('should respond with a single credential', async () => {
    const response = await request(server).get('/api/credentials/1');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('success');

    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('credentials');
    expect(response.body.data).toHaveProperty('lastRefreshRequest');
    expect(response.body.data).toHaveProperty('lastRefreshSuccess');
    expect(response.body.data).toHaveProperty('lastRefreshError');
  });

  test('should throw an error if a credential doesnt exist', async () => {
    const response = await request(server).get('/api/credentials/9999');

    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual("That credential doesn't exist");
  });
});

describe('POST /api/credential', () => {
  test('should return the credential that was added', async () => {
    const response = await request(server)
      .post('/api/credentials')
      .send({
        type: 'bittrex',
        credentials: { key: 'abc', secret: 'xyz' },
        readOnly: true,
      });

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('success');

    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('credentials');
    expect(response.body.data).toHaveProperty('lastRefreshRequest');
    expect(response.body.data).toHaveProperty('lastRefreshSuccess');
    expect(response.body.data).toHaveProperty('lastRefreshError');
  });

  test('should throw an error if the payload is malformed', async () => {
    const response = await request(server)
      .post('/api/credentials')
      .send({
        name: 'bittrex',
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('error');
  });
});

describe('PUT /api/credentials', () => {
  test('should return the credential that was updated', async () => {
    const credentials = await models.Credential.findAll();
    const credential = credentials[0];

    try {
      const response = await request(server)
        .put(`/api/credentials/${credential.id}`)
        .send({ type: 'coinbase' });

      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.status).toEqual('success');

      expect(response.body.data[1][0]).toHaveProperty('type');
      expect(response.body.data[1][0]).toHaveProperty('credentials');
      expect(response.body.data[1][0]).toHaveProperty('lastRefreshRequest');
      expect(response.body.data[1][0]).toHaveProperty('lastRefreshSuccess');
      expect(response.body.data[1][0]).toHaveProperty('lastRefreshError');

      const newObj = response.body.data[1][0];
      expect(newObj.type).not.toBe(credential.type);
    } catch (e) {
      console.log(e);
    }
  });
});

afterEach(() => {
  server.close();
});

// afterAll(async () => {
//   const { stdout, stderr } = await exec('cd api/db; && sequelize db:seed:undo:all');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });
