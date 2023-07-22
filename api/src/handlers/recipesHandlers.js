const {
  createRecipe,
  getRecipeById,
} = require("../controllers/recipesControllers");

const getRecipeHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const wantedRecipe = await getRecipeById(id, source);
    res.status(200).json(wantedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipesHandler = (req, res) => {
  const { name } = req.query;
  res.send(
    `Muestra todas las recetas que coincidan con el nombre ${name} (ya sea en API o en BDD)`
  );
};
/* const postDePrueba = {
	
  "name": "EJEMPLO3",
  "image": "LINK3",
  "summary": "texto3",
  "healthScore": 4,
  "instructions": "queso y dulce" 
} */
const postRecipeHandler = async (req, res) => {
  try {
    const { name, image, summary, healthScore, instructions } = req.body;
    const newRecipe = await createRecipe(
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
