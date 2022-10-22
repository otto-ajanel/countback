const { sequelize } = require("../models");
const stream = require('stream')
const multer = require('multer')
const { google } = require('googleapis');

const db = require("../models");
const Constancia = db.constancia;
const Factura = db.factura;

const Cliente = db.cliente




exports.allFacturas = async (req, res) => {
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
    const facturas = await sequelize.query(
      "select c.dpi, c.fechaNacimiento, f.dpiUrl, f.fechaVenRtu, f.fechaVenFactura, CASE WHEN f.idEstadoFactura = 1 then 'Impreso' ELSE 'Digital' END as estadoFactura from facturas f    inner JOIN  clientes c      on c.id= f.clienteId",
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    res.status(200).send({
      'data': facturas
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

exports.createFactura = async (req, res) => {
  try {
    const factura = await Factura.create({
      dpiUrl: req.body.dpiUrl,
      clienteId: req.body.clienteId,
      noNiss: req.body.noNiss,
      fechaVenRtu: req.body.fechaVenRtu,
      fechaVenFactura: req.body.fechaVenFactura,
      idEstadoFactura: req.body.idEstadoFactura

    });


    res.status(200).send({ message: "factura registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



const uploadFile = async (fileObject) => {

  const CLIENT_ID = '920487823720-4dqjnt2k17559014vqr1ld74n9q4frns.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

  const REFRESH_TOKEN = '1//04Loqhum1BgwXCgYIARAAGAQSNwF-L9IrIomVTM5zNdBO2zG5e0I0d4QRuzNhjqI4tQDJXFGto0r3fEPaXI-CbsW3OP4yIBHLvO0';

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ['1_LP2XXFhYzmypG_mufHdTqXxEFUVv6h-']
    },
    fields: 'id,name',
  });
  const url = data.id
  const fileId = url;
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  /* 
  webViewLink: View the file in browser
  webContentLink: Direct download link 
  */
  const result = await drive.files.get({
    fileId: fileId,
    fields: 'webViewLink, webContentLink',
  });
  return url
};



exports.updloadfile = async (req, res) => {
  let urlUploadId = "ESteno es seteado"
  try {
    const { body, files } = req;
    for (let f = 0; f < files.length; f += 1) {
      const urlUpload = await uploadFile(files[f]).then((id) => id);
      if (urlUpload) {

        urlUploadId = urlUpload
      }

    }
    res.status(200).send(urlUploadId)

  } catch (f) {
    res.send(f.message);
  }
}