const express = require('express')
const router = express.Router()
const mongoose = require('./db/schema')
const Habit = mongoose.model('Habit')

router.get('/', (req, res) => {
  console.log(req.user)
  Habit.find({user_id: req.user._id})
    .then(habits => res.json(habits))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  Habit.create(Object.assign({user_id: req.user._id}, req.body))
    .then(habit => {
      console.log(habit)
      res.json(habit)
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  Habit.findOneAndUpdate({ _id: req.params.id }, { streak: req.body.streak, complete: req.body.complete }, { new: true })
    .then(habit => {
      res.json(habit)
    })
    .catch(error => console.log(error))
})

module.exports = router
