import { GET_RECIPES, GET_DIETS, POST_RECIPE } from "./types";

const initialState = {
  recipes: [],
  diets: [],
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
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
