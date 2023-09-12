const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
})
module.exports = WishList = mongoose.model('wishlist', wishlistSchema)
