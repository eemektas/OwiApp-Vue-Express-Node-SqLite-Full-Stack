const { Location } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const locations = await Location.findAll({
        limit: 100
      })
      res.send(locations)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured while trying to get locations.'
      })
    }
  },
  async post (req, res) {
    try {
      const location = await Location.create(req.body)
      res.send(location)
      console.log('loca', location)
    } catch (err) {
      res.status(500).send({
        error: 'Location already exists. Try to add another one.'
      })
    }
  },
  async put (req, res) {
    try {
      await location.update(req.body, {
        where: {
          id: req.params.locId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update the location'
      })
    }
  }
}