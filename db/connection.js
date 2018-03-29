const mongoose = require('mongoose')

if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MLAB_URL, (err, db) => {
        if (err) { console.log('Error, unable to connect to database.') }
    })
} else {
    mongoose.connect('mongodb://localhost/habits', (err, db) => {
        if (err) {console.log('something went wrong with the db')}
    })
}

mongoose.Promise = Promise

module.exports = mongoose
