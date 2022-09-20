const db = require("../models");
const User = db.user;
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

exports.allUsers = async (req, res) => {
  try {

    const users = await User.findAll();

    res.status(200).send({
      'data': users
    });
  } catch (error) {
    res.status(400).send({
      'message': 'Error de servidor'
    })
  }
};

exports.getUserId = async (req, res) => {
  const id = req.params.id
  try {
    console.log("iniciando get user by Id")
    const user = await User.findAll({
      where: {
        id: id
      }
    })
    res.status(200).send({
      'data': user
    })
  } catch (error) {
    res.status(400).send({
      'message': ' Eror de servidor '
    })
  }
}

exports.updateUserId = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.update({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
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

exports.deleteUserId = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.destroy({
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