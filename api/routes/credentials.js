const Router = require('koa-router');
const models = require('../db/models');

const router = new Router();
const BASE_URL = '/api/credentials';

router.get(BASE_URL, async (ctx) => {
  try {
    const credentials = await models.Credential.findAll();

    ctx.body = {
      data: credentials,
    };
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
