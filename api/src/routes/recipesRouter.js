const recipesRouter = require("express").Router();

recipesRouter.get("/", (req, res) => {
  const { name } = req.query;
  res.send(
    `Muestra todas las recetas que coincidan con el nombre ${name} (ya sea en API o en BDD)`
  );
});
recipesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(
    `Muestra el detalle de la receta ${id} (esté en la API o en la BDD)`
  );
});

recipesRouter.post("/", (req, res) => {
  res.send("Crea una nueva receta en la BD");
});

module.exports = recipesRouter;
