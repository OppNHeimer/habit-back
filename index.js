const express = require('express')
const cors = require('cors')
const parser = require('body-parser')
const passport = require('passport')
const habitsController = require('./habitsController')
const usersController = require('./usersController')

const app = express()

app.use(parser.json())
// app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// app.options('*', cors())

app.use('/auth', cors(), usersController)
app.use('/', passport.authenticate('jwt', { session: false }), habitsController)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log('Listening on ' + app.get('port'))
})
