const { authJwt } = require("../middleware");
const controller = require("../controllers/constancia.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/constancia/all", [authJwt.verifyToken], controller.allConstancias
  );

  app.get("/api/constancia/:id",
    [authJwt.verifyToken],
    controller.getConstanciaId
  );
  app.put("/api/constancia/:id", [authJwt.verifyToken], controller.updateConstanciaId);
  app.delete("/api/constancia/:id", [authJwt.verifyToken], controller.deleteConstanciaId)
  app.post("/api/constancia", [authJwt.verifyToken], controller.createConstancia)
};
