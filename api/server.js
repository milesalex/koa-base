require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('app:server');
const models = require('./db/models');

const indexRoutes = require('./routes/index');
const credentialRoutes = require('./routes/credentials');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(credentialRoutes.routes());

const server = app.listen(PORT, async () => {
  await models.sequelize.sync();
  debug(`Server listening on port: ${PORT}`);
});

module.exports = server;
