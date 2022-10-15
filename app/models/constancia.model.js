module.exports = (sequelize, Sequelize) => {
  const Constancia = sequelize.define("constancias", {
    nombre: {
      type: Sequelize.STRING
    },
    clienteId:{
      type: Sequelize.INTEGER
    }
  });

  return Constancia;
};
