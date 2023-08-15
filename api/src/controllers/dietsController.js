require("dotenv").config();
const { Diet } = require("../db");
const { cleanDiets } = require("../utils");
const recipes = require("../recipes.json");
const axios = require("axios");

const { API_KEY } = process.env;

const getAllDiets = async () => {
  const apiDietsRaw = recipes.results; /* (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`
    )
  ).data.results; */
  const apiDiets = cleanDiets(apiDietsRaw);
  const dbDiets = await Diet.bulkCreate(apiDiets);
  return dbDiets;
};

module.exports = getAllDiets;
