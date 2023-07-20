const { Recipe } = require("../db");

const createRecipe = async (
  id,
  name,
  image,
  summary,
  healthScore,
  instructions
) =>
  await Recipe.create({ id, name, image, summary, healthScore, instructions });

module.exports = createRecipe;
