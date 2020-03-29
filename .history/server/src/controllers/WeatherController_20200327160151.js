const { Weather } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  async index (req, res) {
    try {
      const weatherDatas = await Weather.findAll({
        limit: 1,
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
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
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
      console.log('json', stringJ)
      console.log('wd', sendpac)
      console.log('CITY', city, req.body)
    } catch (err) {
      res.send(err)
    }
  }
}
