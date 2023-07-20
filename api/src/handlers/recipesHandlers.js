const createRecipe = require("../controllers/recipesControllers");

const getRecipeHandler = (req, res) => {
  const { id } = req.params;
  res.send(
    `Muestra el detalle de la receta ${id} (esté en la API o en la BDD)`
  );
};

const getRecipesHandler = (req, res) => {
  const { name } = req.query;
  res.send(
    `Muestra todas las recetas que coincidan con el nombre ${name} (ya sea en API o en BDD)`
  );
};

const postRecipeHandler = async (req, res) => {
  try {
    const { id, name, image, summary, healthScore, instructions } = req.body;
    const newRecipe = await createRecipe(
      id,
      name,
      image,
      summary,
      healthScore,
      instructions
    );

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getRecipeHandler, getRecipesHandler, postRecipeHandler };
