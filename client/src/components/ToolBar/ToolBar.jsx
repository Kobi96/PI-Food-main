import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipesCopy,
  setSort,
  setSource,
  setDiet,
} from "../../redux/actions";
import "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const filters = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);

  useEffect(() => {
    const list = recipes
      .filter((recipe) => {
        if (filters.source === "apiRecipes") return !recipe.created;
        if (filters.source === "dbRecipes") return recipe.created;
        return true;
      })
      .filter((recipe) => {
        if (filters.diet === "allDiets") return true;
        return recipe.diets.toLowerCase().includes(filters.diet);
      })
      .sort((a, b) => {
        if (sort === "Z-a") {
          return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        }

        if (sort === "A-z") {
          return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
        }
        if (sort === "H-L") {
          return a.healthScore > b.healthScore ? -1 : 1;
        }
        if (sort === "L-H") {
          return a.healthScore < b.healthScore ? -1 : 1;
        }
        return 0;
      });
    console.log({ list, filters, sort });
    dispatch(setRecipesCopy(list));
    // eslint-disable-next-line
  }, [filters.source, filters.diet, sort]);

  const sortRecipesHandler = (event) => {
    dispatch(setSort(event.target.value));
  };

  const filterBySourceHandler = (event) => {
    dispatch(setSource(event.target.value));
  };
  const filterByDietHandler = (event) => {
    dispatch(setDiet(event.target.value));
  };

  return (
    <div className="toolbar">
      <div className="orderContainer">
        <span>Ordenar por:</span>
        <select onChange={sortRecipesHandler} className="selectMain">
          <option value="notSorted">Ordenar por...</option>
          <option value="A-z">A-z</option>
          <option value="Z-a">Z-a</option>
          <option value="L-H">Lower</option>
          <option value="H-L">Higher</option>
        </select>
      </div>
      <div className="filterContainer">
        <span>Filtrar dietas:</span>
        <select onChange={filterByDietHandler} className="selectMain">
          <option value="allDiets">Todas las dietas</option>
          {dietsByName.map((diet, index) => {
            return (
              <option value={diet} key={index}>
                {diet}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span>Filtrar por Origen:</span>
        <select onChange={filterBySourceHandler} className="selectMain">
          <option value="allRecipes">Todas</option>
          <option value="apiRecipes">Recetas Originales</option>
          <option value="dbRecipes">Recetas Creadas por Vos!</option>
        </select>
      </div>
    </div>
  );
};

export default ToolBar;
