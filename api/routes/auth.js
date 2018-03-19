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
  const user = await models.User.create(ctx.request.body);
  try {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  } catch (err) {
    console.log(err);
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

module.exports = router;
