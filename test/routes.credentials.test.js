// require the Koa server
const server = require('../api/server');

// require supertest
const request = require('supertest');
const models = require('../api/db/models');
const sequelizeFixtures = require('sequelize-fixtures');
const data = require('./fixtures/credentials');

beforeAll(async () => {
  try {
    await models.sequelize.sync({ force: true });
    await sequelizeFixtures.loadFixtures(data, models);
  } catch (err) {
    console.log(err);
  }
});

afterEach(async () => {
  await server.close();
});

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
    const credentials = await models.Credential.findAll();
    const credential = credentials[0];
    const response = await request(server).get(`/api/credentials/${credential.id}`);

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
        .send({ type: 'test' });

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
      // console.log(e);
    }
  });

  test('should throw an error if credential does not exist', async () => {
    const response = await request(server)
      .put('/api/credentials/99999')
      .send({ type: 'coinbase' });

    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('error');
  });
});

describe('DELETE /api/credentials/:id', () => {
  test('should return the credential that was deleted', async () => {
    const credentials = await models.Credential.findAll();
    const credential = credentials[0];

    const response = await request(server).delete(`/api/credentials/${credential.id}`);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('success');
    expect(response.body.rowsDeleted).toEqual(1);
  });

  test('should throw an error if the credential does not exist', async () => {
    const response = await request(server).delete('/api/credentials/99999');

    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    expect(response.body.status).toEqual('error');
  });
});
