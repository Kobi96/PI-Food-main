import {
  GET_RECIPES,
  GET_DIETS,
  POST_RECIPE,
  GET_RECIPE_BY_ID,
  SET_NAME,
  SET_DIET,
  SET_SOURCE,
  SET_SORT,
  SET_RECIPES_COPY,
} from "./types";

const initialState = {
  recipes: [],
  recipesCopy: [],
  diets: [],
  recipeDetail: {},
  filter: { diet: "allDiets", source: "allRecipes" },
  sort: "notSorted",
  name: "",
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_SOURCE:
      return { ...state, filter: { ...state.filter, source: action.payload } };
    case SET_DIET:
      return {
        ...state,
        filter: { ...state.filter, diet: action.payload },
      };
    case SET_RECIPES_COPY:
      return {
        ...state,
        recipesCopy: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
