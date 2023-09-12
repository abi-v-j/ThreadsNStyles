const express = require('express')
const router = express.Router()
const Joi = require('joi')
const gravatar = require('gravatar')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const config = require('config')
const Seller = require('../../../models/Seller')

const sellerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Email is not valid',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
    'string.min': 'Password must have at least 6 characters',
  }),
  phone: Joi.string().min(10).required().messages({
    'any.required': 'Phone number is required',
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must have at least 10 characters',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required',
    'string.empty': 'Address is required',
  }),
  place: Joi.string().required().messages({
    'any.required': 'Place is required',
    'string.empty': 'Place is required',
  }),
  gst: Joi.string().required().messages({
    'any.required': 'GST number is required',
    'string.empty': 'GST number is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = sellerSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { name, email, password, phone, gst, place, address } = req.body
  try {
    let seller = await Seller.findOne({ email })

    if (seller) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })

    seller = new Seller({
      name,
      email,
      avatar,
      password,
      phone,
      gst,
      place,
      address,
    })

    const salt = 12
    seller.password = await argon2.hash(password, salt)

    await seller.save()

    const payload = {
      seller: {
        id: seller.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
  //see if user already exists
})

router.get('/', async (req, res) => {
  let seller = await Seller.find()
  res.send(seller).status(200)
})

router.get('/:id', async (req, res) => {
  const sellerId = req.params.id
  let seller = await Seller.findById(sellerId)
  res.send(seller).status(200)
})

module.exports = router
