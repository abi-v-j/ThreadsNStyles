module.exports = function (req, res, next) {
  const jwt = require('jsonwebtoken')
  const config = require('config')

  // Get token from header
  const token = req.header('x-auth-token')

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      } else {
        if (decoded.userType === 'user') {
          req.user = decoded.user
          req.userType = 'user' // Set the userType property to 'user'
        } else if (decoded.userType === 'seller') {
          req.seller = decoded.user
          req.userType = 'seller' // Set the userType property to 'seller'
        } else if (decoded.userType === 'admin') {
          req.admin = decoded.user
          req.userType = 'admin' // Set the userType property to 'admin'
        } else {
          return res.status(401).json({ msg: 'Invalid token' })
        }
        next()
      }
    })
  } catch (err) {
    console.error('Something went wrong with the auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
