const mongoose = require('./connection')

const habitSchema = new mongoose.Schema({
  name: String,
  hue: Number,
  lightness: Number,
  streak: Number,
  complete: Boolean
})

mongoose.model('Habit', habitSchema)

module.exports = mongoose
