module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Owner", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
};
