require('dotenv').config();
const Koa = require('koa');
const debug = require('debug')('app:server');

// Database
require('./db');

const app = new Koa();
const PORT = 1337;

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!',
  };
});

const server = app.listen(PORT, () => {
  debug(`Server listening on port: ${PORT}`);
});

module.exports = server;
