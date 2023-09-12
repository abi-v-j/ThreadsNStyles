const express = require('express')
const router = express.Router()
const Place = require('../../../models/Place')
const Joi = require('joi')

const placeSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  district_id: Joi.string().required().messages({
    'any.required': 'Place Id is required',
    'string.empty': 'Place Id is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = placeSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, district_id } = req.body
  try {
    let place = await Place.findOne({ name })

    if (place) {
      return res.status(400).json({ errors: [{ msg: 'Place already exists' }] })
    }

    place = new Place({
      name,
      district_id,
    })

    await place.save()

    res.json({ message: 'Place inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const districtId = req.params.id
    const place = await Place.find({ district_id: districtId })
    if (place.length === 0) {
      return res.status(404).json({ message: 'Place not found' })
    }
    res.send(place).status(200)
  } catch (err) {
    console.error('Error deleting state:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const placeId = req.params.id

    const deletedPlace = await Place.findByIdAndDelete(placeId)

    if (!deletedPlace) {
      return res.status(404).json({ message: 'State not found' })
    }

    res.json({ message: 'Place deleted successfully', deletedPlace })
  } catch (err) {
    console.error('Error deleting district:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
