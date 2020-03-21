const jwt = require('jsonwebtoken')
const { User } = require('../models')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24* 7
  return jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson
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
      res.status(200).send({
        msg: 'Successfully logged in',
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured while trying to log in'
      })
    }
  }
}