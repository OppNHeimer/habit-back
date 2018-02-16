const mongoose = require('./connection')
// var bcrypt = require('bcrypt-nodejs')

const habitSchema = new mongoose.Schema({
  name: String,
  hue: Number,
  lightness: Number,
  streak: Number,
  complete: Boolean
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

// userSchema.methods.encrypt = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }

mongoose.model('Habit', habitSchema)
mongoose.model('User', userSchema)

module.exports = mongoose
