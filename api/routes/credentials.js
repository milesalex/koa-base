const Router = require('koa-router');
const models = require('../db/models');

const router = new Router();
const BASE_URL = '/api/credentials';

// Get all
router.get(BASE_URL, async (ctx) => {
  try {
    const credentials = await models.Credential.findAll();
    ctx.body = {
      status: 'success',
      data: credentials,
    };
  } catch (err) {
    console.log(err);
  }
});

// Get by id
router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const credential = await models.Credential.findById(ctx.params.id);
    if (credential) {
      ctx.body = {
        status: 'success',
        data: credential,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: "That credential doesn't exist",
      };
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
