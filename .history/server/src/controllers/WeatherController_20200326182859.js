const { Weather } = require('../models')
const fetch = require('node-fetch')

module.exports = {
  async post (req, res) {
    try {
      const api = 'bd091ec8d79ff89eba0e2ab15f980531';
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
  },
  async show (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
    } catch (err) {
      res.send(err)
    }
  }
}
