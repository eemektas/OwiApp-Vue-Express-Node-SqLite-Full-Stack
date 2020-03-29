module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    name: {
      type: DataTypes.STRING
    },
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
