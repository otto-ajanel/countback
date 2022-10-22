const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cliente = require("../models/cliente.model.js")(sequelize, Sequelize)
db.constancia = require("../models/constancia.model")(sequelize, Sequelize)
db.controlPago = require("../models/controlPago.model")(sequelize, Sequelize)
db.factura = require("../models/factura.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
/*
db.constancia.belongsToMany(db.cliente, {
  through: "constancia_Cliente",
  foreignKey: "constanciaId",
  otherKey: "clienteId"
})*/
db.cliente.hasMany(db.constancia, { foreignKey: 'clienteId' });

db.constancia.belongsTo(db.cliente, { foreignKey: 'clienteId' });



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
