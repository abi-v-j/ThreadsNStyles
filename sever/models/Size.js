const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
})
module.exports = Size = mongoose.model('size', sizeSchema)
