const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../../models/Users');
const Joi = require('joi');

const userSchema = Joi.object({
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
});

router.post('/', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }

  const { name, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: [{ msg: 'User already exists' }] });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    user = new User({
      name,
      email,
      avatar,
      password,
      phone,
    });

    const salt = 12;
    user.password = await argon2.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  //see if user already exists
});

router.get("/", async (req, res) => {
  let user = await User.find();
  res.send(user).status(200);
});


router.get('/:id', async (req, res) => {
  const userId = req.params.id
  let user = await User.findById(userId)
  res.send(user).status(200)
})

module.exports = router;
