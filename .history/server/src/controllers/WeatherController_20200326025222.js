const { Weather } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  async post (req, res) {
    try {
      const api = 'bd091ec8d79ff89eba0e2ab15f980531';
      const city = await req.body.city
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      const fetch_response = await fetch(url)
      const json = await fetch_response.json()
      const stringJ = JSON.stringify(json)
      const weatherData = await Weather.create(stringJ)
      res.send(stringJ)
      console.log('json', stringJ)
      console.log('wd', weatherData)
      console.log('wea req body', req.body)
    } catch (err) {
      res.send(err)
    }
  },
  async show (req, res) {
    try {
      const city = await Location.findById(req.params.cityId)
      res.send(city)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the city'
      })
    }
  },
}
