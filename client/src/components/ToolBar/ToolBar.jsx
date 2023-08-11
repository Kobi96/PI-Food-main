import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  sort,
  filterByDiet,
  filterBySource,
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
        if (sort === "A-z") {
          return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        }

        if (sort === "Z-a") {
          return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
        }
        if (sort === "H-L") {
          return a.healthScore > b.healthScore ? -1 : 1; // Cambio aquí
        }
        if (sort === "L-H") {
          return a.healthScore < b.healthScore ? -1 : 1;
        }
        return 0;
      });
    console.log({ list, filters, sort });
    dispatch(setRecipesCopy(list));
  }, [filters.source, filters.diet, sort]);

  /*  const [originalRecipes, setOriginalRecipes] = useState([]);
  const [hasExecuted, setHasExecuted] = useState(false); */

  /*  useEffect(() => {
    if (!hasExecuted) {
      setTimeout(() => {
        setOriginalRecipes(recipes);
        setHasExecuted(true);
      }, 1500);
    }
  }, [recipes, hasExecuted]); */

  /*  const dietChangeHandler = (event) => {
    const diet = event.target.value;

    if (diet === "allDiets") return dispatch(getRecipes());

    const filteredRecipesByDiet = originalRecipes.filter((recipe) =>
      recipe.diets.toLowerCase().includes(diet)
    );
    dispatch(filterOrder(filteredRecipesByDiet));
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
      filteredRecipesByOrigin =
    }

    dispatch(filterOrder(filteredRecipesByOrigin));
  };

  const orderChangeHandler = (event) => {
    const order = event.target.value;

    if (order === "default") return dispatch(getRecipes());

    let sortedRecipes;

    if (order === "A-z") {
      sortedRecipes = [...originalRecipes].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (order === "Z-a") {
      sortedRecipes = [...originalRecipes].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (order === "L-H") {
      sortedRecipes = [...originalRecipes].sort(
        (a, b) => a.healthScore - b.healthScore
      );
    } else if (order === "H-L") {
      sortedRecipes = [...originalRecipes].sort(
        (a, b) => b.healthScore - a.healthScore
      );
    }

    dispatch(filterOrder(sortedRecipes));
  }; */

  const [order, setOrder] = useState("");

  const sortRecipesHandler = (event) => {
    dispatch(setSort(event.target.value));
    setOrder(`Ordered ${event.target.value}`);
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
