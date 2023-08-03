import {
  GET_RECIPES,
  GET_RECIPE,
  GET_DIETS,
  POST_RECIPE,
  FILTER,
  ORDER,
} from "./types";
import axios from "axios";

const getRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/food/recipes");
    const recipes = apiData.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};

const getDiets = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/food/diets");
    const diets = apiData.data;
    dispatch({ type: GET_DIETS, payload: diets });
  };
};
const getRecipe = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/food/recipes/${name}`
    );
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE, payload: recipe });
  };
};

const postRecipe = (recipe) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "http://localhost:3001/food/recipes",
      recipe
    );
    dispatch({ type: POST_RECIPE, payload: data });
  };
};

const filterRecipes = (diet) => {
  return { type: FILTER, payload: diet };
};

const orderRecipes = (order) => {
  return { type: ORDER, payload: order };
};

export {
  getRecipes,
  getDiets,
  getRecipe,
  postRecipe,
  filterRecipes,
  orderRecipes,
};
