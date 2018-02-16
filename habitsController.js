const express = require('express')
const router = express.Router()
const mongoose = require('./db/schema')
const Habit = mongoose.model('Habit')

router.get('/', (req, res) => {
  Habit.find({})
    .then(habits => res.json(habits))
    .catch(error => console.log(error))
})
// const getHabits = (req, res) => {
//   Habit.find({})
//     .then(habits => res.json(habits))
//     .catch(error => console.log(error))
// }
router.post('/', (req, res) => {
  Habit.create(req.body)
    .then(habit => {
      res.json(habit)
    })
    .catch(error => console.log(error))
})
// const newHabit = (req, res) => {
//   Habit.create(req.body)
//     .then(habit => {
//       res.json(habit)
//     })
//     .catch(error => console.log(error))
// }
router.put('/:id', (req, res) => {
  Habit.findOneAndUpdate({ _id: req.params.id }, { streak: req.body.streak, complete: req.body.complete }, { new: true })
    .then(habit => {
      res.json(habit)
    })
    .catch(error => console.log(error))
})

module.exports = router
// const updateHabit = (req, res) => {
//   Habit.findOneAndUpdate({ _id: req.params.id }, { streak: req.body.streak, complete: req.body.complete }, { new: true })
//     .then(habit => {
//       res.json(habit)
//     })
//     .catch(error => console.log(error))
// }

// module.exports = {
//   getHabits,
//   newHabit,
//   updateHabit
// }
