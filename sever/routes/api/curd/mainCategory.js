const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const MainCategory = require('../../../models/MainCategory')
const Joi = require('joi')

const maincategorySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = maincategorySchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name } = req.body
  try {
    let maincategory = await MainCategory.findOne({ name })

    if (maincategory) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Main Category already exists' }] })
    }

    maincategory = new MainCategory({
      name,
    })

    await maincategory.save()

    res.json({ message: 'Main Category inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/', async (req, res) => {
  let mainCategory = await MainCategory.find()
  res.send(mainCategory).status(200)
})

router.delete('/:id', async (req, res) => {
  try {
    const McategoryId = req.params.id

    const deletedMcategory = await MainCategory.findByIdAndDelete(McategoryId)

    if (!deletedMcategory) {
      return res.status(404).json({ message: 'Main Category not found' })
    }

    res.json({
      message: 'Main Category deleted successfully',
      deletedMcategory,
    })
  } catch (err) {
    console.error('Error deleting Main Category:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
