const express = require('express')
const cors = require('cors')()
const parser = require('body-parser')

const habitsController = require('./habitsController')

const app = express()
app.use(parser.json())
app.use(cors)

app.use('/', habitsController)
app.set('port', process.env.PORT || 3003)

app.listen(app.get('port'), () => {
  console.log('Listening on ' + app.get('port'))
})
