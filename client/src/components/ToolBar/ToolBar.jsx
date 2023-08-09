import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets, filterByDiets } from "../../redux/actions";
import "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();
  const [dietFilterState, setDietFilterState] = useState([]);
  const [auxRecipesState, setAuxRecipesState] = useState([]);

  const recipes = useSelector((state) => state.recipes);
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);

  if (!auxRecipesState.length) setAuxRecipesState(recipes);
  console.log(auxRecipesState);

  const dietChangeHandler = (event) => {
    const diet = event.target.value;
    dispatch(getRecipes());
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.diets.toLowerCase().includes(diet)
    );
    setDietFilterState(filteredRecipes);
  };

  useEffect(() => {
    dispatch(filterByDiets(dietFilterState));
  }, [dispatch, dietFilterState]);

  return (
    <div className="toolbar">
      <div className="orderContainer">
        <span>Ordenar por:</span>
        <select
          /* onChange={(e) => handleChange(e)} */
          defaultValue={"default"}
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
        <select
          /* onChange={(e) => handleChangeBdd(e)} */ className="selectMain"
        >
          <option value="TODAS">Todas</option>
          {/* <option value="Bdd" disabled={!recipesBdd.length > 0} key="Bdd">
            Propias
          </option> */}
          <option value="Api" key="Api">
            API
          </option>
        </select>
      </div>
    </div>
  );
};

export default ToolBar;
