const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24* 7
  return jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async index (req, res) {
    try {
      const users = await User.findAll({
        limit: 100
      })
      res.send(users)
    } catch (err) {
      res.send(err)
    }
  },
  async put (req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      res.send(req.body)
    } catch (err) {
      res.send(err)
    }
  },
  async remove (req, res) {
    try {
      console.log('userssssss', req.params, req.body)
      const usr = await User.findOne({
        where: {
          id: req.params.id
        }
      })
      await usr.destroy()
      res.send(usr)
    } catch (err) {
      res.send(err)
    }
  },
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This username is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to login'
      })
    }
  }
}
