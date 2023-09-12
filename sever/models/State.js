const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})
module.exports = State = mongoose.model('state', stateSchema)
