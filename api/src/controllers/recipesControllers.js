require("dotenv").config();
const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const createRecipe = async (name, image, summary, healthScore, instructions) =>
  await Recipe.create({ name, image, summary, healthScore, instructions });

const getRecipeById = async (id, source) => {
  if (source === "api") {
    const { data } = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    return data;
  } else if (source === "bdd") {
    return Recipe.findByPk(id);
  }
};
module.exports = { createRecipe, getRecipeById };
