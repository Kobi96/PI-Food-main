require("dotenv").config();
const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const recipes = require("../recipes.json");

const cleanDiets = (arr) => {
  const array = arr.map((ele) => ele.diets).flat();

  const dietsRaw = array.filter((valor, indice) => {
    return array.indexOf(valor) === indice;
  });

  const diets = dietsRaw.map((name) => ({ name }));

  return diets;
};

const getAllDiets = async () => {
  const apiDietsRaw = recipes.results;
  const apiDiets = cleanDiets(apiDietsRaw);
  const dbDiets = await Diet.bulkCreate(apiDiets);
  return dbDiets;
};

module.exports = getAllDiets;
