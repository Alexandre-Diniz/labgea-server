const { Model, DataTypes } = require('sequelize')
const sequelize = require('../services/sequelize')

class Rfid extends Model {}

Rfid.init({
  tag: DataTypes.STRING
},{
  sequelize,
  modelName:'Rfid',
  timestamps: false
})

module.exports = Rfid