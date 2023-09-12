const express = require('express')
const router = express.Router()
const District = require('../../../models/District')
const Joi = require('joi')

const districtSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  state_id: Joi.string().required().messages({
    'any.required': 'State Id is required',
    'string.empty': 'State Id is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = districtSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, state_id } = req.body
  try {
    let district = await District.findOne({ name })

    if (district) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'District already exists' }] })
    }

    district = new District({
      name,
      state_id,
    })

    await district.save()

    res.json({ message: 'District inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/:id', async (req, res) => {
  try {
    const stateId = req.params.id
    const district = await District.find({ state_id: stateId })
    if (district.length === 0) {
      return res.status(404).json({ message: 'District not found' })
    }
    res.send(district).status(200)
  } catch (err) {
    console.error('Error deleting state:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const districtId = req.params.id;

    
    const deletedDistrict = await District.findByIdAndDelete(districtId);

    if (!deletedDistrict) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.json({ message: 'District deleted successfully', deletedDistrict });
  } catch (err) {
    console.error('Error deleting district:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router
