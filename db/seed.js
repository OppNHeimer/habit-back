const mongoose = require('./schema')
const Habit = mongoose.model('Habit')
const User = mongoose.model('User')
const habitSeeds = require('./seeds.json')
const userSeeds = require('./userSeeds.json')

console.log('hello from seed.js')
Habit.remove({})
  .then(() => {
    Habit.collection.insert(habitSeeds)
    .then(habits => {
      console.log('Seeded habits:')
      console.log(JSON.stringify(habits, null, 2))
      // process.exit()
    })
  })
  .catch(error => console.log(error))

User.remove({})
  .then(() => {
    User.collection.insert(userSeeds)
    .then(user => {
      console.log('Seeded users:')
      console.log(JSON.stringify(users, null, 2))
      process.exit()
    })
  })
  .catch(error => console.log(error))
