const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const LocationController = require('./controllers/LocationController')
const WeatherController = require('./controllers/WeatherController')


module.exports = (app) => {
  app.get('/register', 
  AuthController.getInfo)

  app.post('/register', 
    AuthControllerPolicy.register,
    AuthController.register)

  app.post('/login',
    AuthController.login)

  app.get('/locations',
    LocationController.index)

  app.post('/locations',
    LocationController.post)

  app.delete('/locations',
    LocationController.del)

  app.post('/weather',
    WeatherController.post) 

  app.get('/weather',
    WeatherController.index)

  app.get('/users',
    AuthController.index)  
}
