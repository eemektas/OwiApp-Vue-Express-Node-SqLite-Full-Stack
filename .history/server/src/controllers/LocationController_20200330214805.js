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
          city: req.place.city
        }
      })
      res.send(req.body)
    } catch (err) {
      res.send(err)
    }
  },
  async del (req, res) {
    try {
      await location.delete(req.body, {
        where: {
          city: req.params.city
        }
      })
      res.send(req.body)
    } catch (err) {
      res.send(err)
    }
  }
}