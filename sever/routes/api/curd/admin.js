const express = require('express')
const router = express.Router()
const Admin = require('../../../models/Admin')

router.get('/', async (req, res) => {
  let admin = await Admin.find()
  res.send(admin).status(200)
})

module.exports = router
