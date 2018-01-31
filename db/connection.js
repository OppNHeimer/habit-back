const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/habits')

mongoose.Promise = Promise

module.exports = mongoose
