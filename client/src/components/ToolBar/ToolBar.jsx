import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filter } from "../../redux/actions";
import "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);

  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [hasExecuted, setHasExecuted] = useState(false);

  useEffect(() => {
    if (!hasExecuted) {
      setTimeout(() => {
        setOriginalRecipes(recipes);
        setHasExecuted(true);
      }, 1000);
    }
  }, [recipes, hasExecuted]);

  const dietChangeHandler = (event) => {
    const diet = event.target.value;

    if (diet === "allDiets") return dispatch(getRecipes());

    const filteredRecipesByDiet = originalRecipes.filter((recipe) =>
      recipe.diets.toLowerCase().includes(diet)
    );
    dispatch(filter(filteredRecipesByDiet));
  };

  const originChangeHandler = (event) => {
    const origin = event.target.value;

    if (origin === "allRecipes") return dispatch(getRecipes());

    let filteredRecipesByOrigin;

    if (origin === "apiRecipes") {
      filteredRecipesByOrigin = originalRecipes.filter(
        (recipe) => recipe.created === false
      );
    } else if (origin === "dbbRecipes") {
      filteredRecipesByOrigin = originalRecipes.filter(
        (recipe) => recipe.created === true
      );
    }

    dispatch(filter(filteredRecipesByOrigin));
  };

  return (
    <div className="toolbar">
      <div className="orderContainer">
        <span>Ordenar por:</span>
        <select
          /*           onChange={(e) => handleChange(e)}
           */ defaultValue={"default"}
          className="selectMain"
        >
          <option value="default">Ordenar por...</option>
          <option value="A-z">A-z</option>
          <option value="Z-a">Z-a</option>
          <option value="L-H">Lower</option>
          <option value="H-L">Higher</option>
        </select>
      </div>
      <div className="filterContainer">
        <span>Filtrar dietas:</span>
        <select onChange={dietChangeHandler} className="selectMain">
          <option value="allDiets">Todas las dietas</option>
          {dietsByName.map((diet) => {
            return (
              <option value={diet} key={diet}>
                {diet}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span>Filtrar por Origen:</span>
        <select onChange={originChangeHandler} className="selectMain">
          <option value="allRecipes">Todas</option>
          <option value="apiRecipes">Recetas Originales</option>
          <option value="dbbRecipes">Recetas Creadas por Vos!</option>
        </select>
      </div>
    </div>
  );
};

export default ToolBar;
