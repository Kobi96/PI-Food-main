import { GET_RECIPES, GET_RECIPE, FILTER, ORDER } from "./types";
import axios from "axios";

export const getRecipes = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/food/recipes");
    const recipes = apiData.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};

export const getRecipe = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/food/recipes/${name}`
    );
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE, payload: recipe });
  };
};

export const filterRecipes = (diet) => {
  return { type: FILTER, payload: diet };
};

export const orderRecipes = (order) => {
  return { type: ORDER, payload: order };
};
