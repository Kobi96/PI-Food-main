require("dotenv").config();
const { Op } = require("sequelize");
const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY, API_KEY2 } = process.env;

const cleanArray = (arr) => {
  const array = arr.map((ele) => {
    return {
      id: ele.id,
      name: ele.title,
      image: ele.image,
      summary: ele.summary,
      healthScore: ele.healthScore,
      instructions: ele.analyzedInstructions.reduce(
        (accumulator, instruction) => {
          const steps = instruction.steps.map((step) => step.step);
          return accumulator.concat(steps.join(" "));
        },
        ""
      ),
      created: false,
    };
  });
  return array;
};

const createRecipe = async (name, image, summary, healthScore, instructions) =>
  await Recipe.create({ name, image, summary, healthScore, instructions });

const getRecipeById = async (id, source) => {
  if (source === "api") {
    const recipe = (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
    ).data;

    const cleanRecipe = cleanArray([recipe]);

    return cleanRecipe[0];
  }
  return Recipe.findByPk(id);
};

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll();

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...dataBaseRecipes, ...apiRecipes];
};

const getRecipesByName = async (name) => {
  const dataBaseRecipes = await Recipe.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=40&addRecipeInformation=true`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  const filteredApi = apiRecipes.filter((recipe) => {
    const query = name.toLowerCase();
    if (recipe.name.toLowerCase().includes(query)) return recipe;
  });

  return [...filteredApi, ...dataBaseRecipes];
};
module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  getRecipesByName,
};
