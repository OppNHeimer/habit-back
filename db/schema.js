const mongoose = require('./connection')
const bcrypt = require('bcrypt-nodejs')

const habitSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  hue: Number,
  lightness: Number,
  streak: Number,
  complete: Boolean
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  activeHabits: Number
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = (password, user) => {
  if (user.password !== null) {
    return bcrypt.compareSync(password, user.password)
  } else {
    return false
  }
}

mongoose.model('Habit', habitSchema)
mongoose.model('User', userSchema)

module.exports = mongoose
