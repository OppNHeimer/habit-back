const express = require('express')
const router = express.Router()
const passport = require('./passport')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res, next) => {
  console.log('signup')
  passport.authenticate('local-signup', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json(info)
    }
    if (user) {
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err)
        }
        console.log('success')
        return res.json({
          token: jwt.sign(user.toJSON(), 'your_jwt_secret'),
          user: user
        })
      })
    }
  })(req, res, next)
  // console.log(res.header)
  // res.json({})
})

router.post('/login', (req, res) => {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json(info)
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err)
      }
      return res.json({
        token: jwt.sign(user.toJSON(), 'your_jwt_secret'),
        user: user
      })
    })
  })(req, res)
})

module.exports = router
