const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const LocationController = require('./controllers/LocationController')
const WeatherController = require('./controllers/WeatherController')


module.exports = (app) => {
  app.post('/register', 
    AuthControllerPolicy.register,
    AuthController.register)

  app.post('/login',
    AuthController.login)

  app.get('/locations',
    LocationController.index)

  app.post('/locations',
    LocationController.post)

  // app.put('/locations/:id',
  //   LocationController.update)

  app.put('/locations/:id',
    LocationController.put)

  app.delete('/locations/:id',
    LocationController.remove)

  app.post('/weather',
    WeatherController.post) 

  app.get('/weather',
    WeatherController.index)

  app.get('/users',
    AuthController.index)  
  
  app.put('/users/:id',
    AuthController.put)

  app.delete('/users/:id',
    AuthController.remove)
}
