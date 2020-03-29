module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    freezeTableName: true,
    city: {
      type: DataTypes.STRING
    },
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
