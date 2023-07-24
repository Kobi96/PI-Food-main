require("dotenv").config();
const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

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

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll();

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=40&addRecipeInformation=true`
    )
  ).data.results;

  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...dataBaseRecipes, ...apiRecipes];
};

module.exports = { createRecipe, getRecipeById, getAllRecipes };
