const express = require('express')
const router = express.Router()
const Size = require('../../../models/Size')
const Joi = require('joi')

const sizeSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  category_id: Joi.string().required().messages({
    'any.required': 'Category Id is required',
    'string.empty': 'Category Id is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = sizeSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, category_id } = req.body
  try {
    let size = await Size.findOne({ name })

    if (size) {
      return res.status(400).json({ errors: [{ msg: 'Size already exists' }] })
    }

    size = new Size({
      name,
      category_id,
    })

    await size.save()

    res.json({ message: 'Size inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id
    const size = await Size.find({ category_id: categoryId })
    if (size.length === 0) {
      return res.status(404).json({ message: 'Size not found' })
    }
    res.send(size).status(200)
  } catch (err) {
    console.error('Error deleting size:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const sizeId = req.params.id

    const deletedSize = await Size.findByIdAndDelete(sizeId)

    if (!deletedSize) {
      return res.status(404).json({ message: 'Size not found' })
    }

    res.json({ message: 'Size deleted successfully', deletedSize })
  } catch (err) {
    console.error('Error deleting size:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
