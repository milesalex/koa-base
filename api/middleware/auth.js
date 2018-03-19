const passport = require('koa-passport');
// const LocalStrategy = require('passport-local').Strategy;
const JsonStrategy = require('passport-json').Strategy;
// const bcrypt = require('bcryptjs');
const models = require('../db/models');

// const options = {};

// function comparePass(userPassword, databasePassword) {
//   return bcrypt.compareSync(userPassword, databasePassword);
// }

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) =>
  models.User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    }));

passport.use(new JsonStrategy((username, password, done) => {
  models.User.findByEmail(username)
    .then((user) => {
      if (!user) return done(null, false);
      if (password === user.password) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err));
}));

exports.passportPromiseAuth = function passportPromiseAuth(ctx) {
  try {
    const p = new Promise((resolve, reject) => {
      passport.authenticate('json', (err, user, info, status) => {
        if (err) {
          console.log(err);
          reject('An unexpected error occurred');
        }
        if (!user) {
          reject('Invalid credentials supplied');
        }
        if (user) {
          ctx.login(user);
          resolve(user);
        }
      })(ctx);
    });
    return p;
  } catch (e) {
    console.log(e);
  }
};
