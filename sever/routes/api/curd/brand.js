const express = require('express')
const router = express.Router()
const Brand = require('../../../models/Brand')
const Joi = require('joi')

const brandSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  logo: Joi.string().required().messages({
    'any.required': 'Logo is required',
    'string.empty': 'Logo is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = brandSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, logo } = req.body
  try {
    let brand = await Brand.findOne({ name })

    if (brand) {
      return res.status(400).json({ errors: [{ msg: 'Brand already exists' }] })
    }

    brand = new Brand({
      name,
      logo
    })

    await brand.save()

    res.json({ message: 'Brand inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/', async (req, res) => {
  let brand = await Brand.find()
  res.send(brand).status(200)
})

router.delete('/:id', async (req, res) => {
  try {
    const brandId = req.params.id

    const deletedBrand = await Brand.findByIdAndDelete(brandId)

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' })
    }

    res.json({ message: 'Brand deleted successfully', deletedBrand })
  } catch (err) {
    console.error('Error deleting brand:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
