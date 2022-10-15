//const { sequelize } = require("../models");
const db = require("../models");
const ControlPago = db.controlPago;




exports.allControlPago = async (req, res) => {
  try {

    const controlPagos = await ControlPago.findAll();
    /*
    const constancias = await sequelize.query(
      "select c.id, c.nombre as constancia, cl.nombre as cliente, cl.nit, cl.dpi,c.clienteId FROM constancias c INNER JOIN  clientes cl on c.clienteId= cl.id",
      {
        type: sequelize.QueryTypes.SELECT
      }
    )*/
    res.status(200).send({
      'data': controlPagos
    });
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor'
    })
  }
};

exports.getControlPagoId = async (req, res) => {
  const id = req.params.id
  try {

    const controlPago = await ControlPago.findAll({
      where: {
        id: id
      }
    })
    if (user) {
      res.status(200).send({
        'data': controlPago
      })
    }

  } catch (error) {
    res.status(400).send({
      'message': ' Eror de servidor '
    })
  }
}



exports.deleteControlPagoId = async (req, res) => {
  const id = req.params.id
  try {
    const controlPago = await ControlPago.destroy({
      where: {
        id: id
      }
    })
    res.status(200).send({
      'message': 'Dstroy controlPago'
    })
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor '
    })
  }
}

exports.createControlPago = async (req, res) => {
  try {
    const controlPago = await ControlPago.create({
      clienteId: req.body.clienteId,
      servicioId: req.body.servicioId,
      totalPago: req.body.totalPago

    });


    res.status(200).send({ message: "ControlPago registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};