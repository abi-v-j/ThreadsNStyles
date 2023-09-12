// app.js (or index.js)

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ extended: false }))

// Connect to the database
connectDB()

// Define API routes using Express Router
const usersRoute = require('./routes/api/curd/users')
const sellerRoute = require('./routes/api/curd/seller')
const districtRoute = require('./routes/api/curd/district')
const brandRoute = require('./routes/api/curd/brand')
const mainCategoryRoute = require('./routes/api/curd/mainCategory')
const adminRoute = require('./routes/api/curd/admin')
const loginRoute = require('./routes/api/curd/login')
const stateRoute = require('./routes/api/curd/state')
const placeRoute = require('./routes/api/curd/place')
const categoryRoute = require('./routes/api/curd/category')
const subCategoryRoute = require('./routes/api/curd/subCategory')
const wishlistRoute = require('./routes/api/curd/wishlist')
const sizeRoute = require('./routes/api/curd/size')

app.use('/api/users', usersRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/district', districtRoute)
app.use('/api/brand', brandRoute)
app.use('/api/mainCategory', mainCategoryRoute)
app.use('/api/admin', adminRoute)
app.use('/api/login', loginRoute)
app.use('/api/state', stateRoute)
app.use('/api/place', placeRoute)
app.use('/api/category', categoryRoute)
app.use('/api/subcategory', subCategoryRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/size', sizeRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
