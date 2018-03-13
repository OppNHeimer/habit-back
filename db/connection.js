const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1/habits')

mongoose.connect('mongodb://localhost/habits')

mongoose.Promise = Promise

module.exports = mongoose
