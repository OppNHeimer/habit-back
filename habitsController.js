const express = require('express')
const router = express.Router()
const mongoose = require('./db/schema')
const Habit = mongoose.model('Habit')
const User = mongoose.model('User')


router.get('/', (req, res) => {
  console.log(req.user)
  Habit.find({user_id: req.user._id})
    .then(habits => res.json(habits))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  Habit.create(Object.assign({user_id: req.user._id}, req.body))
    .then(habit => {
      Habit.find({user_id: req.user._id})
      .then(habits => res.json(habits))
      .catch(error => console.log(error))      
    })
    .catch(error => console.log(error))
})

router.get('/getBackgroundColor', (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      res.json(user)
    })
})

router.put('/updateBackgroundColor', (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { backgroundColor: req.body.backgroundColor }, { new: true })
    .then(user => {
      res.json(user)
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
