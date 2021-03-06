const { Weather } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  async getWeather (req, res) {
    try {
      const api = 'bd091ec8d79ff89eba0e2ab15f980531';
      const city = await req.body.city
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      const fetch_response = await fetch(url)
      const json = await fetch_response.json()
      const weatherData = await Weather.create(json.toString())
      res.send(json)
    } catch (err) {
      res.send(err)
    }
  }
}
