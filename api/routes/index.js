const Router = require('koa-router');
const models = require('../db/models');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!',
  };
});

module.exports = router;
