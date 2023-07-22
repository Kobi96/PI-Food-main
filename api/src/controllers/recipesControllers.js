require("dotenv").config();
const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const createRecipe = async (name, image, summary, healthScore, instructions) =>
  await Recipe.create({ name, image, summary, healthScore, instructions });

const getRecipeById = async (id, source) => {
  const recipe =
    source === "api"
      ? (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
          )
        ).data
      : Recipe.findByPk(id);

  return recipe;
};
module.exports = { createRecipe, getRecipeById };
