const express = require('express')
const router = express.Router()
const Joi = require('joi')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../../models/Users')
const Seller = require('../../../models/Seller')
const Admin = require('../../../models/Admin')
const auth = require('../auth/auth')

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Email is not valid',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
})

router.post('/', async (req, res) => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details })
  }

  const { email, password } = req.body
  try {
    // Check if the email exists in both User and Seller collections
    const user = await User.findOne({ email })
    const seller = await Seller.findOne({ email })
    const admin = await Admin.findOne({ email })

    if (!user && !seller && !admin) {
      return res.status(400).json({ error: 'Invalid credential' })
    }

    // Verify the password for the corresponding user or seller
    let isValidPassword = false
    let userData

    if (user) {
      isValidPassword = await argon2.verify(user.password, password)
      userData = user
    } else if (seller) {
      isValidPassword = await argon2.verify(seller.password, password)
      userData = seller
    } else if (admin) {
      isValidPassword = await argon2.verify(admin.password, password)
      userData = admin
    }
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token for the authenticated user or seller
    const payload = {
      user: {
        id: userData.id,
      },
      userType: user ? 'user' : seller ? 'seller' : admin ? 'admin' : null,
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
})

router.get('/', auth, async (req, res) => {
  try {
    if (req.userType === 'user') {
      // If the user is authenticated as a regular user
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } else if (req.userType === 'seller') {
      // If the user is authenticated as a seller
      const seller = await Seller.findById(req.seller.id).select('-password')
      res.json(seller)
    } else if (req.userType === 'admin') {
      // If the user is authenticated as an admin
      const admin = await Admin.findById(req.admin.id).select('-password')
      res.json(admin)
    } else {
      // If neither user nor seller is authenticated
      res.status(400).json({ error: 'Invalid credentials' })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
