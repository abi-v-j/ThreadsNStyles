const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
})
module.exports = SubCategory = mongoose.model('subcategory', subcategorySchema)
