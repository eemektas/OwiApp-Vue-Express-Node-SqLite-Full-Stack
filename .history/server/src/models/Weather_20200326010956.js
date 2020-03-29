module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    weatherData: {
      type: DataTypes.STRING
    }
  })
  return Weather
}
