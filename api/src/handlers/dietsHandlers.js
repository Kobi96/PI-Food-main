const getAllDiets = require("../controllers/dietsController");
const { Diet } = require("../db");

const getDietsHandler = async (req, res) => {
  const db = await Diet.findAll();
  try {
    if (!db.length) {
      const diets = await getAllDiets();
      res.status(200).json(diets);
    } else {
      res.status(200).json(db);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDietsHandler;
