import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_DIETS,
  POST_RECIPE,
  SET_NAME,
  SET_DIET,
  SET_SOURCE,
  SET_SORT,
  SET_RECIPES_COPY,
  GET_RECIPES_BY_NAME,
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
const getRecipeById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/food/recipes/${id}`);
    const recipe = apiData.data;
    console.log(recipe);
    dispatch({ type: GET_RECIPE_BY_ID, payload: recipe });
  };
};
const postRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/food/recipes",
        recipe
      );

      if (response.status === 201) {
        dispatch({ type: POST_RECIPE, payload: response.data });
        alert("Receta Creada");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.error
          ? error.response.data.error
          : "Error al crear la receta";

      alert(errorMessage);
    }
  };
};

const getRecipesByName = (name) => {
  return async function (dispatch) {
    try {
      console.log(name);
      const apiData = await axios.get(
        `http://localhost:3001/food/recipes?name=${name}`
      );

      if (apiData.status === 400) {
        dispatch({ type: GET_RECIPES_BY_NAME, payload: [] });
      } else {
        const recipes = apiData.data;
        recipes.length
          ? dispatch({ type: GET_RECIPES_BY_NAME, payload: recipes })
          : dispatch({ type: GET_RECIPES_BY_NAME, payload: [] });
      }
    } catch (error) {
      console.error("Error fetching API data:", error);
      dispatch({ type: GET_RECIPES_BY_NAME, payload: [] });
    }
  };
};
const setGlobalName = (payload) => {
  return { type: SET_NAME, payload };
};
const setSource = (payload) => {
  return { type: SET_SOURCE, payload };
};
const setDiet = (payload) => {
  return { type: SET_DIET, payload };
};
const setSort = (payload) => {
  return { type: SET_SORT, payload };
};
const setRecipesCopy = (payload) => {
  return { type: SET_RECIPES_COPY, payload };
};

export {
  getRecipes,
  getDiets,
  getRecipeById,
  postRecipe,
  getRecipesByName,
  setGlobalName,
  setDiet,
  setSort,
  setSource,
  setRecipesCopy,
};
