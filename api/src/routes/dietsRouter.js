const dietsRouter = require("express").Router();
const getDietsHandler = require("../handlers/dietsHandlers");

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
