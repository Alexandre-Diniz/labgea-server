const express = require('express')
const User = require('../models/User')
const Rfid = require('../models/Rfid')
const validation = require('../utils/validation')
const { truncate } = require('../models/User')

const Router = express.Router()

Router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(404).json(error)
    }
  })

  .post(async (req, res, next) => {
    try {
      const data = req.body
      validation(
        !data?.name || data?.name.split('') === '',
        'Forneça um nome válido!',
        () => res.status(206),
      )
      validation(
        !data?.tag || data?.tag.split('') === '',
        'Forneça uma tag válida!',
        () => res.status(206),
      )

      const tag = await User.findOne({
        attributes: ['tag'],
        where: {
          tag: data.tag,
        },
      })

      console.log(tag)

      validation(tag, 'Tag já está cadastrada!', () => res.status(406))

      const user = await User.create({
        name: data.name,
        tag: data.tag,
      })
      const tagDeleted = await Rfid.destroy({
        where: {},
        truncate: true,
      })
      if (user.toJSON().id) res.status(201).json(user.toJSON().id)
    } catch (error) {
      res.json(error)
    }
  })

Router.route('/:tag')
  .put(async (req, res, next) => {
    try {
      const data = req.body
      const tag = req.params?.tag
      console.log(tag)

      validation(!tag, 'Usuário não fornecido!')
      validation(
        !data?.name || data?.name.split('') === '',
        'Forneça um nome válido!',
      )
      validation(
        !data?.tag || data?.tag.split('') === '',
        'Forneça uma tag válida!',
      )

      const user = await User.findOne({
        where: {
          tag,
        },
      })

      validation(!user, 'Usuário não encontrado!')

      const userUpdated = await User.update(
        {
          ...data,
        },
        {
          where: {
            tag,
          },
        },
      )

      res.status(200).json(userUpdated)
    } catch (error) {
      console.error(error)
      res.status(404).json(error.message)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const data = req.params
      console.log(data)
      validation(!data?.tag, 'Informe um usuário existente!')

      const userExists = await User.findOne({
        where: {
          tag: data.tag,
        },
      })

      validation(!userExists, 'Usuário não encontrado!')

      const userDeleted = await User.destroy({
        where: {
          tag: data.tag,
        },
      })

      res.status(200).json(userDeleted)
    } catch (error) {
      res.status(404).json(error.message)
    }
  })

module.exports = Router
