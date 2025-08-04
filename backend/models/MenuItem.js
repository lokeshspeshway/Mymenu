module.exports = (sequelize, DataTypes) => {
  return sequelize.define("MenuItem", {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING
  });
};
