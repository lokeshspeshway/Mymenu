const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config").development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Owner = require("./owner")(sequelize, Sequelize);
db.MenuItem = require("./menuItem")(sequelize, Sequelize);

db.Owner.hasMany(db.MenuItem, { foreignKey: "ownerId" });
db.MenuItem.belongsTo(db.Owner, { foreignKey: "ownerId" });

module.exports = db;
