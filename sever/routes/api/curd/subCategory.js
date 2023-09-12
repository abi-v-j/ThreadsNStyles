const express = require('express')
const router = express.Router()
const SubCategory = require('../../../models/SubCategory')
const Joi = require('joi')

const subcategorySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  category_id: Joi.string().required().messages({
    'any.required': 'Place Id is required',
    'string.empty': 'Place Id is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = subcategorySchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, category_id } = req.body
  try {
    let subcategory = await SubCategory.findOne({ name })

    if (subcategory) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Sub Category already exists' }] })
    }

    subcategory = new SubCategory({
      name,
      category_id,
    })

    await subcategory.save()

    res.json({ message: 'Sub Category inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id
    const subcategory = await SubCategory.find({ category_id: categoryId })
    if (subcategory.length === 0) {
      return res.status(404).json({ message: 'Sub Category not found' })
    }
    res.send(subcategory).status(200)
  } catch (err) {
    console.error('Error Select Sub Category:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const subcategoryId = req.params.id

    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      subcategoryId
    )

    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Sub Category not found' })
    }

    res.json({
      message: 'Sub Category deleted successfully',
      deletedSubCategory,
    })
  } catch (err) {
    console.error('Error deleting Sub Category:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
