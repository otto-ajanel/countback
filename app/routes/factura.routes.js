const { authJwt } = require("../middleware");
const controller = require("../controllers/factura.controller");

const multer = require('multer')
const upload = multer()

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/factura/all", [authJwt.verifyToken], controller.allFacturas
  );

  app.get("/api/constancia/:id",
    [authJwt.verifyToken],
    controller.getConstanciaId
  );
  app.put("/api/constancia/:id", [authJwt.verifyToken], controller.updateConstanciaId);
  app.delete("/api/constancia/:id", [authJwt.verifyToken], controller.deleteConstanciaId)
  app.post("/api/factura", [authJwt.verifyToken], controller.createFactura)

  app.post('/api/uploadFactura', upload.any(), controller.updloadfile)
};
