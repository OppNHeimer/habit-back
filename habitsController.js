const express = require('express')
const router = express.Router()
const mongoose = require('./db/schema')
const Habit = mongoose.model('Habit')

// get all habits
router.get('/', (req, res) => {
  Habit.find({})
  .then(habits => res.json(habits))
  .catch(error => console.log(error))
})

// new habit
router.post('/', (req, res) => {
  Habit.create(req.body)
  .then(habit => {
    res.json(habit)
  })
  .catch(error => console.log(error))
})

// increment streak
router.put('/:id', (req, res) => {
  Habit.findOneAndUpdate({_id: req.params.id}, {$inc: {streak: 1}}, {new: true})
  .then(habit => {
    res.json(habit)
  })
  .catch(error => console.log(error))
})

module.exports = router
