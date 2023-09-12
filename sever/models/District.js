const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state_id: {
    type: String,
    required: true,
  },
})
module.exports = District = mongoose.model('district', districtSchema)
