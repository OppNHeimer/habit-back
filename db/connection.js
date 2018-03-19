const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1/habits')

if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MLAB_URL, (err, db) => {
        if (err) { console.log('Error, unable to connect to database.') }
    })
} else {
    mongoose.connect('mongodb://localhost/habits', (err, db) => {
        if (err) {console.log('something went wrong with the db')}
    })
}

// mongoose.connect('mongodb://habit100:pass@ds115569.mlab.com:15569/habit100', (err, db) => {
//     if (err) {
//         console.log('error, unable to connect to database')
//     }
// })

// let db = mongoose.connection

// db.on('error', console.error.bind(console, 'connection error:'))

mongoose.Promise = Promise

module.exports = mongoose
