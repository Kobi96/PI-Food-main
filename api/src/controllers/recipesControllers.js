require("dotenv").config();
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const getAllDiets = require("./dietsController");
const axios = require("axios");
const { API_KEY } = process.env;
const recipes = require("../recipes.json");
const { cleanArray, cleanDiet } = require("../utils");

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  instructions,
  diets
) => {
  const existingRecipe = await Recipe.findOne({ where: { name } });

  if (existingRecipe) {
    return `Ya existe la receta con el nombre ${name}`;
  }
  const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    instructions,
  });
  const db = await Diet.findAll();

  if (db.length) {
    await newRecipe.addDiets(diets);
  } else {
    getAllDiets();
    await newRecipe.addDiets(diets);
  }

  const newRecipeWithDietRaw = await Recipe.findOne({
    where: { name: name },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const newRecipeWithDiet = cleanDiet([newRecipeWithDietRaw]);

  return newRecipeWithDiet;
};

const getRecipeById = async (id, source) => {
  // No se puede hardcodear. Siempre devuelve la misma receta
  if (source === "api") {
    const apiRecipe = (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
    ).data;
    const cleanRecipe = cleanArray([apiRecipe]);

    return cleanRecipe[0];
  }
  const dbbRecipeRaw = await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbbRecipe = cleanDiet([dbbRecipeRaw]);
  return dbbRecipe[0];
};

const getAllRecipes = async () => {
  const dbbRecipesRaw = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dbbRecipes = cleanDiet(dbbRecipesRaw);
  const apiRecipesRaw = /* recipes.results; */ (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=75&addRecipeInformation=true`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...dbbRecipes, ...apiRecipes];
};

const getRecipesByName = async (name) => {
  const dbbRecipeRaw = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dbbRecipe = cleanDiet(dbbRecipeRaw);

  const apiRecipesRaw =
    /*  recipes.results; */
    (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=75&addRecipeInformation=true`
      )
    ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  const filteredApi = apiRecipes.filter((recipe) => {
    const query = name.toLowerCase();
    if (recipe.name.toLowerCase().includes(query)) return recipe;
  });
  return [...filteredApi, ...dbbRecipe];
};
module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  getRecipesByName,
};
