module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    city: {
      type: DataTypes.STRING,
      unique: true
    },
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
