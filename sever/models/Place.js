const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  district_id: {
    type: String,
    required: true,
  },
})
module.exports = Place = mongoose.model('place', placeSchema)
