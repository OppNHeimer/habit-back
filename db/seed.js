const mongoose = require('./schema')
const Habit = mongoose.model('Habit')
const User = mongoose.model('User')
const habitSeeds = require('./seeds.json')
const userSeeds = require('./userSeeds.json')

let user = new User({
  email: "email",
  password: "password",
  activeHabits: 0
})
Habit.remove({})
  .then(() => {
    User.create({
     
    })
    .then(res => {
      console.log(res)
    })
  })
  .then(() => { process.exit()})
  .catch(err => {console.log(err)}
)

