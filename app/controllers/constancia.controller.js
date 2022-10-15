const { sequelize } = require("../models");
const db = require("../models");
const Constancia = db.constancia;
const Cliente = db.cliente




exports.allConstancias = async (req, res) => {
  try {
    /*
        const constancias = await Constancia.findAll({
          include: [
            {
              model: Cliente,
              where: [
                'Cliente.id= Constancia.clienteId'
              ]
            }
          ]
        });
    */
    const constancias = await sequelize.query(
      "select c.id, c.nombre as constancia, cl.nombre as cliente, cl.nit, cl.dpi,c.clienteId FROM constancias c INNER JOIN  clientes cl on c.clienteId= cl.id",
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    console.log(constancias)
    res.status(200).send({
      'data': constancias
    });
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor'
    })
  }
};

exports.getConstanciaId = async (req, res) => {
  const id = req.params.id
  try {

    const constancia = await Constancia.findAll({
      where: {
        id: id
      }
    })
    if (user) {
      res.status(200).send({
        'data': constancia
      })
    }

  } catch (error) {
    res.status(400).send({
      'message': ' Eror de servidor '
    })
  }
}

exports.updateConstanciaId = async (req, res) => {
  try {
    const id = req.params.id
    const constancia = await Constancia.update({
      nombre: req.body.nombre,
      clienteId: req.body.clienteId,

    }, {
      where: {
        id: id
      }
    })
    res.status(200).send({
      'message': 'User Update'
    })
  } catch (error) {
    res.status(400).send({
      'message': error
    })
  }
}

exports.deleteConstanciaId = async (req, res) => {
  const id = req.params.id
  try {
    const user = await Constancia.destroy({
      where: {
        id: id
      }
    })
    res.status(200).send({
      'message': 'Dstroy user'
    })
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor '
    })
  }
}

exports.createConstancia = async (req, res) => {
  try {
    const cliente = await Constancia.create({
      nombre: req.body.nombre,
      clienteId: req.body.clienteId,

    });


    res.status(200).send({ message: "Conjstancia registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};