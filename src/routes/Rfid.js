const express = require('express')
const User = require('../models/User')
const validation = require('../utils/validation')
const Rfid = require('../models/Rfid')
const { Op } = require('sequelize')

const Router = express.Router()

Router.route('/')
  .get(async(req,res,next)=>{
    try {
      const rfidList = await Rfid.findAll({
        order:[['created_at','DESC']]
      })
      validation(!rfidList || rfidList.length===0, 'Nenhuma TAG econtrada!')
      res.status(200).json(rfidList[0])
    } catch (error) {
      res.status(404).json(error.message)
    }
  })
  .post(async (req,res,next)=> {
    try {
      const data = req.body
      validation(!data?.tag, 'Forneça uma tag válida!')
      const tagDeleted = await Rfid.destroy({
        where: {},
        truncate: true,
      })
      const tagAdded = await Rfid.create({
        tag: data.tag
      })
      res.status(201).json(tagAdded.toJSON())
    } catch (error) {
      res.status(404).json(error.message)
    }
  })

Router.route('/:tag')
  .get(async(req,res,next)=>{
    try {
      const data = req.params
      validation(!data?.tag, 'Forneça uma tag válida!')
      const user = await User.findOne({
        where:{
          tag: data.tag
        }
      })
      validation(!user, 'Tag não encontrada!')
      res.status(200).json(user)
    } catch (error) {
      res.status(404).json(error.message)
    }
  })

module.exports = Router