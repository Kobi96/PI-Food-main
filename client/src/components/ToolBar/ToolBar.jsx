import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterByDiets } from "../../redux/actions";
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

    console.log(diet);
    if (diet === "allDiets") dispatch(getRecipes());

    const filteredRecipes = originalRecipes.filter((recipe) =>
      recipe.diets.toLowerCase().includes(diet)
    );
    console.log(filteredRecipes);
    dispatch(filterByDiets(filteredRecipes));
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
        <select
        /*           onChange={(e) => handleChangeBdd(e)} className="selectMain"
         */
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
