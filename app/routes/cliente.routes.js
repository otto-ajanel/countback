const { authJwt } = require("../middleware");
const controller = require("../controllers/cliente.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/cliente/all",
    controller.allClientes
  );

  app.get("/api/cliente/:id",
    [authJwt.verifyToken],
    controller.getClienteId
  );
  app.put("/api/cliente/:id", [authJwt.verifyToken], controller.updateClienteId);
  app.delete("/api/cliente/:id", [authJwt.verifyToken], controller.deleteClienteId)


  app.post("/api/cliente",
    [authJwt.verifyToken],
    controller.createCliente
  );
};
