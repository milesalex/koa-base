const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const models = require('../db/models');
const { passportPromiseAuth } = require('../middleware/auth');

const router = new Router();

router.get('/auth/register', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./api/views/register.html');
});

router.post('/auth/register', async (ctx) => {
  try {
    const user = await models.User.create(ctx.request.body);

    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.get('/auth/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./api/views/status.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

router.get('/auth/login', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./api/views/login.html');
  } else {
    ctx.redirect('/auth/status');
  }
});

module.exports = router;
