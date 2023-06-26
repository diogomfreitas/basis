const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.servants = require("./servant.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);

db.categories.hasMany(db.servants, {
  as: "category",
  foreingKey: "categoryId",
});
db.servants.belongsTo(db.categories);

module.exports = db;
