module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: {
      type: DataTypes.STRING,
      unique: true
    }
  })
  return Location
}
