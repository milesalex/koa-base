require('dotenv').config();
const Koa = require('koa');

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
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
