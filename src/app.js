const express = require('express')
const cors = require('cors')
const UserRoute = require('./routes/User')
const HisotryRoute = require('./routes/History')
const RfidRoute = require('./routes/Rfid')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users',UserRoute)
app.use('/history', HisotryRoute)
app.use('/rfid',RfidRoute)

module.exports = app