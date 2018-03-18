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

// POST credential
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const credential = await models.Credential.create(ctx.request.body);
    if (credential) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: credential,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

// PUT
router.put(`${BASE_URL}/:id`, async (ctx) => {
  const { type, credentials } = ctx.request.body;

  try {
    const credential = await models.Credential.update(
      { type, credentials },
      {
        where: { id: ctx.params.id },
        returning: true,
      },
    );

    if (credential && credential[0] > 0) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: credential,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That credential does not exist.',
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const credential = await models.Credential.destroy({ where: { id: ctx.params.id } });

    if (credential && credential > 0) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        rowsDeleted: credential,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That credential does not exist.',
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.type = 'application/json';
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.',
    };
  }
});

module.exports = router;
