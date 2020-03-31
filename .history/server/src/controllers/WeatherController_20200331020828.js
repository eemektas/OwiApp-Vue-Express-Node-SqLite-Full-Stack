const { Weather } = require('../models')
const fetch = require('node-fetch')
require('dotenv').config({ path: '@/.env' })

module.exports = {
  async index (req, res) {
    try {
      const weatherDatas = await Weather.findAll({
        limit: 1000,
        order: [ [ 'updatedAt', 'DESC' ] ]
      })
      res.send(weatherDatas)
    } catch (err) {
      res.send(err)
    }
  },
  async post (req, res) {
    try {
      const api = process.env.OWM_API
      const city = await req.body.city
      const id = await req.body.id
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bd091ec8d79ff89eba0e2ab15f980531`
      const fetch_response = await fetch(url)
      const json = await fetch_response.json()
      const stringJ = JSON.stringify(json)
      const pac = {
        id: id,
        city: req.body.city,
        weatherData: stringJ
      }
      const sendpac = await Weather.create(pac)
      res.json({
        weatherData: json
      })
    } catch (err) {
      res.send(err)
    }
  }
}