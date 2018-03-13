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
        return done(null, false, { message: 'Incorrect username or password' })
      }
      if (err) { 
        return done(err, false, { message: err }) 
      }
      if (!user.validPassword(password, user)) {
        return done(null, false, { message: 'Incorrect username or password.'})
      }
      if (user.validPassword(password, user)) {
        return done(null, user, { message: 'Logged in successfully' })
      }
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
        var newUser = new User()
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save(err => {
          if (err) { return done(err) }
          return done(null, newUser, { message: 'user created' })
        })

        // User.create({
        //   email: email,
        //   password: password
        // }, (err, user) => {
        //   if (err) { done(err) }
        //   return done(null, user, { message: 'user created' })
        // })
      }
    })
  }
))

passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  function (jwtPayload, callback) {
    return User.findOne({ _id: jwtPayload._id })
      .then(user => {
        return callback(null, user)
      })
      .catch(err => {
        return callback(err)
      })
  }
))

module.exports = passport
