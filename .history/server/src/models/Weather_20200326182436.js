module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    city: {
      type: DataTypes.STRING
    },
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
