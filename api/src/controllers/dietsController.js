require("dotenv").config();
const { Diet } = require("../db");
const { cleanDiets } = require("../utils");
const recipes = require("../recipes.json");
const axios = require("axios");

const { API_KEY2 } = process.env;

const getAllDiets = async () => {
  const apiDietsRaw = recipes.results; /* (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=75&addRecipeInformation=true`
    )
  ).data.results; */
  const apiDiets = cleanDiets(apiDietsRaw);
  const dbDiets = await Diet.bulkCreate(apiDiets);
  return dbDiets;
};

module.exports = getAllDiets;
