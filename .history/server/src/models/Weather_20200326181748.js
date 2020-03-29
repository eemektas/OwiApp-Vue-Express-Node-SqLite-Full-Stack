module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    freezeTableName: true,
    name: {
      type: DataTypes.STRING
    },
    weatherData: {
      type: DataTypes.TEXT
    }
  })
  return Weather
}
