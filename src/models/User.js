const { Model, DataTypes } = require('sequelize')
const sequelize = require('../services/sequelize')

class User extends Model {}

User.init({
  name: DataTypes.STRING,
  tag: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
})

module.exports = User