const { sequelize } = require("../models");
const db = require("../models");
const ControlPago = db.controlPago;


exports.reportServices = async (req, res) => {

  try {
    const services = await sequelize.query(
      "SELECT COUNT(c.id) as cantidad, CASE WHEN c.servicioId=1 THEN 'Actualización' WHEN c.servicioId=2 THEN 'Honorarios'  WHEN c.servicioId = 3 THEN 'Constancia' WHEN c.servicioId=4 THEN 'Inscripción'   END as servicio FROM  controlpagos c inner join  clientes cl on cl.id=c.clienteId GROUP BY c.servicioId",
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    res.status(200).send({
      'data': services
    })
  } catch (error) {

    res.status(405).send({
      'messages': error
    });
  }
}

exports.allControlPago = async (req, res) => {
  try {


    const controlPagos = await sequelize.query(
      "SELECT c.id,cl.nombre, cl.nit, CASE WHEN c.servicioId=1 THEN 'Actualización' WHEN c.servicioId=2 THEN 'Honorarios'  WHEN c.servicioId = 3 THEN 'Constancia' WHEN c.servicioId=4 THEN 'Inscripción'   END as servicio, CASE   WHEN c.servicioId < 4 THEN 50    ELSE 300 END as totalPago FROM  controlpagos c inner join  clientes cl on cl.id=c.clienteId",
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    res.status(200).send({
      'data': controlPagos
    });
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor'

    })
    console.log(error)
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