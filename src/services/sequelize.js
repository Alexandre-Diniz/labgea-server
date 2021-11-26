const { Sequelize } = require('sequelize')
require('dotenv').config()

sequelize = new Sequelize({
  database:process.env.DATABASE,
  username: process.env.USER,
  password:process.env.PASSWORD,
  host:process.env.HOST,
  dialect:'mysql'
})

module.exports = sequelize