const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('./db/schema')
const User = mongoose.model('User')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    User.findOne({email: email}, (err, user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' })
      }
      if (err) {
        return done(err)
      }
      return done(null, user, { message: 'Logged in successfully' })
    })
  }
))

passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    User.findOne({email: email}, (err, user) => {
      if (user) {
        return done(null, false, { message: 'email address already in use' })
      }
      if (err) {
        return done(err, false, { message: 'something went' })
      }
      if (!user) {
        User.create({
          email: email,
          password: password
        })
          .then(user => {
            return done(null, user, { message: 'user created' })
          })
          .catch(err => console.log(err))
      }
    })
  }
))

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  function (jwtPayload, callback) {
    return User.findOneById(jwtPayload.id)
      .then(user => {
        return callback(null, user)
      })
      .catch(err => {
        return callback(err)
      })
  }
))

// const passportStrategy = (passport) => {
//   passport.use('logIn', new LocalStrategy(
//     function (username, password, done) {
//       User.findOne({ 'local.username': username }, function (err, user) {
//         if (err) { return done(err) }
//         if (!user) { return done(null, false) }
//         if (!user.verifyPassword(password)) { return done(null, false) }
//         return done(null, user)
//       })
//     })
//   )
// }

module.exports = passport
