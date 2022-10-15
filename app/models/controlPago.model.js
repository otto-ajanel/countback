module.exports = (sequelize, Sequelize) => {
  const ControlPago = sequelize.define("controlPagos", {
    servicioId: {
      type: Sequelize.INTEGER
    },
    clienteId: {
      type: Sequelize.INTEGER
    },
    totalPago:
    {
      type: Sequelize.INTEGER
    }
  });

  return ControlPago;
};
