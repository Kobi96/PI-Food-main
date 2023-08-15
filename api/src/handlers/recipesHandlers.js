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
  try {
    const results =
      name !== undefined ? await getRecipesByName(name) : await getAllRecipes();
    return results.length
      ? res.status(200).json(results)
      : res.status(400).json(`No se ha encontrado la receta ${name}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* const postDePrueba = {
	
  "name": "EJEMPLO",
  "image": "LINK",
  "summary": "texto",
  "healthScore": 4,
  "instructions": "TEXTO" 
} */
const postRecipeHandler = async (req, res) => {
  try {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
    if (
      !name ||
      !image ||
      !summary ||
      !healthScore ||
      !instructions ||
      !diets
    ) {
      throw new Error("Faltan datos");
    }

    const newRecipe = await createRecipe(
      name,
      image,
      summary,
      healthScore,
      instructions,
      diets
    );

    if (newRecipe === `Ya existe la receta con el nombre ${name}`) {
      throw new Error(`Ya existe la receta con el nombre ${name}`);
    } else {
      res.status(201).json(newRecipe);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  postRecipeHandler,
  getAllRecipes,
  getRecipesByName,
};
