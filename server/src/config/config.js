module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'owi',
    user: process.env.DB_USER || 'owi',
    password: process.env.DB_PASS || 'owi',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: '../../owi.sqlite'
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}