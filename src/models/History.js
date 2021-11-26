const { Model, DataTypes } = require('sequelize')
const sequelize = require('../services/sequelize')

class History extends Model {}

History.init({
  user_id: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'History',
  timestamps: false
})

module.exports = History