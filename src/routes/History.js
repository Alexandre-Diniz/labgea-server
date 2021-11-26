const express = require('express')
const History = require('../models/History')
const User = require('../models/User')
const validation = require('../utils/validation')
const { Op } = require('sequelize')

const Router = express.Router()

Router.route('/')
  .get(async(req,res,next)=>{
    try {
      const date = new Date(req.query.date).toDateString()
      const formated_date = new Date(date)
      const response = await History.findAll({
        attributes:['user_id','created_at'],
        where:{
          created_at:{
            [Op.gte]: formated_date
          }
        },
        order: [['created_at','DESC']]
      })
      const historyPromises = response.map(async item=>{
        try {
          const user = await User.findOne({
            where:{
              id:item.toJSON().user_id
            }
          })
          return { name:user.toJSON().name, created_at: item.toJSON().created_at }
        } catch (error) {
          console.error(error)
        }
      })
      let history = []
      await Promise.all(historyPromises).then(list=>{
        history = list
      })
      res.status(200).json(history)
    } catch (error) {
      res.status(404).json(error.message)
    }
  })

  .post(async(req,res,next)=>{
    try {
      const data = req.body
      validation(!data?.user_id, 'Forneça um usuário válido!')
      const user = await User.findOne({
        attributes:['id'],
        where:{
          id:data.user_id
        }
      })
      validation(!user, 'Usuário não encontrado!')
      const historyAdded = await History.create({
        user_id: data.user_id
      })
      res.status(200).json(historyAdded)
    } catch (error) {
      res.status(404).json(error.message)
    }
  })

module.exports = Router