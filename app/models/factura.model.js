module.exports = (sequelize, Sequelize) => {
  const Factura = sequelize.define("facturas", {
    dpiUrl: {
      type: Sequelize.STRING
    },
    clienteId: {
      type: Sequelize.INTEGER
    },
    noNiss: {
      type: Sequelize.INTEGER
    },
    fechaVenRtu: {
      type: Sequelize.DATE
    },
    fechaVenFactura: {
      type: Sequelize.DATE
    },
    idEstadoFactura: {
      type: Sequelize.INTEGER
    }

  });

  return Factura;
};
