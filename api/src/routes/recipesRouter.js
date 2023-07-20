const recipesRouter = require("express").Router();
const {
  getRecipeHandler,
  getRecipesHandler,
  postRecipeHandler,
} = require("../handlers/recipesHandlers");

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipeHandler);

recipesRouter.post("/", postRecipeHandler);

module.exports = recipesRouter;
