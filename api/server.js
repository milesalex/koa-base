require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const session = require('koa-session');
const passport = require('koa-passport');
const debug = require('debug')('app:server');
const models = require('./db/models');

const indexRoutes = require('./routes/index');
const credentialRoutes = require('./routes/credentials');
const authRoutes = require('./routes/auth');

const app = new Koa();
const PORT = process.env.PORT || 1337;

// sessions
app.keys = ['your-session-secret'];
app.use(session({}, app));

// body parser
app.use(bodyParser());
app.use(json());

// authentication
require('./middleware/auth');

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(indexRoutes.routes());
app.use(credentialRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, async () => {
  await models.sequelize.sync();
  debug(`Server listening on port: ${PORT}`);
});

module.exports = server;
