const mongoose = require('./schema')
const Habit = mongoose.model('Habit')
const habitSeeds = require('./seeds.json')

Habit.remove({})
  .then(() => {
    Habit.collection.insert(habitSeeds)
    .then(habits => {
      console.log('Seeded:')
      console.log(JSON.stringify(habits, null, 2))
      process.exit()
    })
  })
  .catch(error => console.log(error))
