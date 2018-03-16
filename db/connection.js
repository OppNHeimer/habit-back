const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1/habits')

// if (process.env.NODE_ENV == 'production') {
    // mongoose.connect(process.env.MLAB_URL)
// } else {
//     mongoose.connect('mongodb://localhost/habits')
// }
mongoose.connect('mongodb://habit100:bratSwag44%hab@ds115569.mlab.com:15569/habit100')
mongoose.Promise = Promise

module.exports = mongoose
