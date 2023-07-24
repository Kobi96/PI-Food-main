const {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  getRecipesByName,
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

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;

  const results = name ? getRecipesByName(name) : await getAllRecipes();

  res.status(200).json(results);
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

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  postRecipeHandler,
  getAllRecipes,
  getRecipesByName,
};
