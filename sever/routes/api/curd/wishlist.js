const express = require('express')
const router = express.Router()
const WishList = require('../../../models/WishList')
const Joi = require('joi')

const wishlistSchema = Joi.object({
  product_id: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  user_id: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = wishlistSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { product_id, user_id } = req.body
  try {
    let wishlist = await WishList.findOne({ product_id, user_id })

    if (wishlist) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Wish List already exists' }] })
    }

    wishlist = new WishList({
      product_id,
      user_id,
    })

    await wishlist.save()

    res.json({ message: 'Wish List inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const wishlist = await WishList.find({ user_id: userId })
    if (wishlist.length === 0) {
      return res.status(404).json({ message: 'Wish List not found' })
    }
    res.send(wishlist).status(200)
  } catch (err) {
    console.error('Error select Wish List:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const wishlistId = req.params.id

    const deletedWishList = await WishList.findByIdAndDelete(wishlistId)

    if (!deletedWishList) {
      return res.status(404).json({ message: 'Wish List not found' })
    }

    res.json({ message: 'Wish List deleted successfully', deletedWishList })
  } catch (err) {
    console.error('Error deleting Wish List:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
