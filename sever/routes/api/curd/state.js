const express = require('express')
const router = express.Router()
const State = require('../../../models/State')
const Joi = require('joi')

const stateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = stateSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name } = req.body
  try {
    let state = await State.findOne({ name })

    if (state) {
      return res.status(400).json({ errors: [{ msg: 'State already exists' }] })
    }

    state = new State({
      name,
    })

    await state.save()

    res.json({ message: 'State inserted successfully' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  //see if user already exists
})

router.get('/', async (req, res) => {
  let state = await State.find()
  res.send(state).status(200)
})

router.delete('/:id', async (req, res) => {
    try {
      const stateId = req.params.id;
  
      
      const deletedState = await State.findByIdAndDelete(stateId);
  
      if (!deletedState) {
        return res.status(404).json({ message: 'State not found' });
      }
  
      res.json({ message: 'State deleted successfully', deletedState });
    } catch (err) {
      console.error('Error deleting state:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router
