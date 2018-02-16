const express = require('express')
const router = express.Router()
const passport = require('./passport')
const jwt = require('jsonwebtoken')
const mongoose = require('./db/schema')
const User = mongoose.model('User')

router.post('/signup', (req, res, next) => {
  console.log('ping')
  passport.authenticate('local-signup', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'signup error',
        user: user
      })
    }
    if (user) {
      console.log(user)
      User.create({
        email: user.email,
        password: user.password
      })
      .then(user => { res.json(user) })
      .catch(err => console.log(err))
      // need to create new user
    }
    // req.logIn(user, { session: false }, (err) => {
    //   if (err) {
    //     res.send(err)
    //   }
    //   let token = jwt.sign(user, 'your_jwt_secret')
    //   return res.json({ user, token })
    // })
  })(req, res, next)
  // res.json({hi: 'hi'})
})

router.post('/login', (req, res) => {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'login error',
        user: user
      })
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err)
      }
      let token = jwt.sign(user, 'your_jwt_secret')
      return res.json({ user, token })
    })
  })(req, res) // ??
})

module.exports = router
// const login = (req, res, next) => {
//   passport.authenticate('local-login', {session: false}, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: 'login error',
//         user: user
//       })
//     }
//     req.login(user, {session: false}, (err) => {
//       if (err) {
//         res.send(err)
//       }
//       let token = jwt.sign(user, 'your_jwt_secret')
//       return res.json({user, token})
//     })
//   })(req, res) // ??
// }

// const signup = (req, res, next) => {
//   passport.authenticate('local-signup', {session: false}, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: 'signup error',
//         user: user
//       })
//     }
//     req.login(user, {session: false}, (err) => {
//       if (err) {
//         res.send(err)
//       }
//       let token = jwt.sign(user, 'your_jwt_secret')
//       return res.json({user, token})
//     })
//   })(req, res)
// }
// // GET /signup
// const signUp = (req, res) => {

// }

// const logIn = (req, res) => {
//   let logInStrategy = passport.authenticate('logIn')

//   logInStrategy(req, res)
// }
// // POST /signup
// function postSignup (request, response) {
// }

// // GET /login
// function getLogin (request, response) {
// }

// // POST /login
// function postLogin (request, response) {
// }

// // GET /logout
// function getLogout (request, response) {
// }

// // Restricted page
// function secret (request, response) {
// }

// module.exports = {
//   getLogin: getLogin,
//   postLogin: postLogin,
//   getSignup: getSignup,
//   postSignup: postSignup,
//   getLogout: getLogout,
//   secret: secret
// }

// module.exports = {
//   login: login,
//   signup: signup
// }
