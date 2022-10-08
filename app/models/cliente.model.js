module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("clientes", {
    nombre: {
      type: Sequelize.STRING
    },
    nit: {
      type: Sequelize.STRING
    },
    dpi: {
      type: Sequelize.STRING
    } ,
    fechaNacimiento: {
      type: Sequelize.DATE
    },
    telefono: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return User;
};
