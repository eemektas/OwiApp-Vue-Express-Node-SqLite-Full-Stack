const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')
const { sequelize } = require('./models')
const config = require('./config/config')
const session = require('express-session')

const app = express()
const router = express.Router()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
app.use(session({
  secret: 'Secret-Key',
  cookie: { maxAge: 8*60*60*1000 },
  saveUninitialized: false,
  resave: false}))

require('./routes')(app)

sequelize.sync() // {force: true} in sync func to del all tables
  .then(() => {
    app.listen(config.port)
    console.log(`Server is listening on http://localhost:${config.port}/`)
  })
