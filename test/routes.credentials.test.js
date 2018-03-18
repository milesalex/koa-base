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
