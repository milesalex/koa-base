process.env.NODE_ENV = 'development';

// require the Koa server
const server = require('../api/server');

// require supertest
const request = require('supertest');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// beforeAll(async () => {
//   const { stdout, stderr } = await exec('cd api/db; sequelize db:seed:all');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });

describe('routes: credentials', () => {
  test('should respond as expected', async () => {
    const response = await request(server).get('/api/credentials');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data.length).toEqual(2);
    expect(response.body.status).toEqual('success');

    expect(response.body.data[0]).toHaveProperty('type');
    expect(response.body.data[0]).toHaveProperty('credentials');
    expect(response.body.data[0]).toHaveProperty('lastRefreshRequest');
    expect(response.body.data[0]).toHaveProperty('lastRefreshSuccess');
    expect(response.body.data[0]).toHaveProperty('lastRefreshError');
  });

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

afterEach(() => {
  server.close();
});

// afterAll(async () => {
//   const { stdout, stderr } = await exec('cd api/db; && sequelize db:seed:undo:all');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });
