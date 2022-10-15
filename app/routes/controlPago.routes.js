const { authJwt } = require("../middleware");
const controller = require("../controllers/controlPago.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/controlPago/all", [authJwt.verifyToken], controller.allControlPago
  );

  app.get("/api/controlPago/:id",
    [authJwt.verifyToken],
    controller.getControlPagoId
  );
  app.delete("/api/controlPago/:id", [authJwt.verifyToken], controller.deleteControlPagoId)
  app.post("/api/controlPago", [authJwt.verifyToken], controller.createControlPago)
};
