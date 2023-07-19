const mainRouter = require("express").Router();
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");

mainRouter.use("/recipes", recipesRouter);
mainRouter.use("/diets", dietsRouter);

module.exports = mainRouter;
