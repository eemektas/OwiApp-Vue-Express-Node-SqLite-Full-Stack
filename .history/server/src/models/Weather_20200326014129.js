module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
