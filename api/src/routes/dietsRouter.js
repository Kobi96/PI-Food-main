const dietsRouter = require("express").Router();

dietsRouter.get("/", (req, res) => {
  res.send("Devuelve un arreglo con todos los tipos de dietas");
});

module.exports = dietsRouter;
