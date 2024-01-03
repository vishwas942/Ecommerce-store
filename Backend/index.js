const express = require('express')
const ConnectTomongo = require('./db')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')



dotenv.config();
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', require('./Routes/authRoute'))
app.use('/api/category', require('./Routes/categoryRoute'))
app.use('/api/product', require('./Routes/productRoute'))

app.listen(port, () => {
  console.log(`Example app ${process.env.DEV_MODE} on listening on port ${port}`)



})

ConnectTomongo();