import {
  GET_RECIPES,
  GET_DIETS,
  POST_RECIPE,
  GET_RECIPE_BY_ID,
  GET_RECIPE_BY_NAME,
  FILTER_BY_DIETS,
} from "./types";

const initialState = {
  recipes: [],
  diets: [],
  recipeDetail: {},
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_RECIPE_BY_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_DIETS:
      return { ...state, recipes: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
