const express = require('express')
const router = express.Router()
const Category = require('../../../models/Category')
const Joi = require('joi')

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  mcategory_id: Joi.string().required().messages({
    'any.required': 'Main Category Id is required',
    'string.empty': 'Main Category Id is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = categorySchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, mcategory_id } = req.body
  try {
    let category = await Category.findOne({ name })

    if (category) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'District already exists' }] })
    }

    category = new Category({
      name,
      mcategory_id,
    })

    await category.save()

    res.json({ message: 'Category inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const mcategoryId = req.params.id
    const category = await Category.find({ mcategory_id: mcategoryId })
    if (category.length === 0) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.send(category).status(200)
  } catch (err) {
    console.error('Error select category:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const categorytId = req.params.id

    const deletedCategory = await Category.findByIdAndDelete(categorytId)

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.json({ message: 'Category deleted successfully', deletedCategory })
  } catch (err) {
    console.error('Error deleting Category:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
