require("dotenv").config();
const { Diet } = require("../db");
const { cleanDiets } = require("../utils");
const recipes = require("../recipes.json");

const getAllDiets = async () => {
  const apiDietsRaw = recipes.results;
  const apiDiets = cleanDiets(apiDietsRaw);
  const dbDiets = await Diet.bulkCreate(apiDiets);
  return dbDiets;
};

module.exports = getAllDiets;
