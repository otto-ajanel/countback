const db = require("../models");
const Cliente = db.cliente;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.allClientes = async (req, res) => {
  try {

    const Clientes = await Cliente.findAll();

    res.status(200).send({
      'data': Clientes
    });
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor'
    })
  }
};

exports.getClienteId = async (req, res) => {
  const id = req.params.id
  try {
  
    const cliente = await Cliente.findAll({
      where: {
        id: id
      }
    })
    if (user) {
      res.status(200).send({
        'data': cliente
      })  
    }
    
  } catch (error) {
    res.status(400).send({
      'message': ' Eror de servidor '
    })
  }
}

exports.updateClienteId = async (req, res) => {
  try {
    const id = req.params.id
    console.log(rq.body.nombre)
    const cliente = await Cliente.update({
      nombre: req.body.nombre,
      nit: req.body.nit,
      dpi:req.body.dpi,
      fechaNacimiento:req.body.fechaNacimiento,
      telefono:req.body.telefono,
      email:req.body.email
     
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

exports.deleteClienteId = async (req, res) => {
  const id = req.params.id
  try {
    const cliente = await Cliente.destroy({
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
exports.createCliente= async (req, res) => {
  try {
    const cliente = await Cliente.create({
      nombre: req.body.nombre,
      nit: req.body.nit,
      dpi:req.body.dpi,
      fechaNacimiento:req.body.fechaNacimiento,
      telefono:req.body.telefono,
      email:req.body.email
    });


     res.status(200).send({ message: "Cliente registered successfully!" });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
