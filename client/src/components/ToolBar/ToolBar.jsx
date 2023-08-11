import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipesCopy,
  setSort,
  setSource,
  setDiet,
  getRecipes,
  setGlobalName,
} from "../../redux/actions";
import "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);
  const [localName, setLocalName] = useState("");

  //Lo que el useEffect va a observar y generar una nueva lista de recetas en caso que haya cambios
  const recipes = useSelector((state) => state.recipes);
  const filters = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const globalName = useSelector((state) => state.name);
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
      .filter((recipe) => {
        if (!globalName) return true;
        const query = globalName.toLowerCase();
        return recipe.name.toLowerCase().includes(query);
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
    console.log({ list, filters, sort, globalName });
    dispatch(setRecipesCopy(list));
    // eslint-disable-next-line
  }, [filters.source, filters.diet, sort, globalName]);

  //Funciones manejadoras para cada filtro y ordenamiento
  const setSortRecipesHandler = (event) => {
    dispatch(setSort(event.target.value));
  };
  const setFilterBySourceHandler = (event) => {
    dispatch(setSource(event.target.value));
  };
  const setFilterByDietHandler = (event) => {
    dispatch(setDiet(event.target.value));
  };
  const setLocalNameHandler = (event) => {
    if (!event.target.value) dispatch(setGlobalName(""));
    setLocalName(event.target.value);
  };
  const onSearch = () => {
    dispatch(setGlobalName(localName));
  };

  return (
    <div className="toolbar">
      <div className="orderContainer">
        <span>Ordenar por:</span>
        <select onChange={setSortRecipesHandler} className="selectMain">
          <option value="notSorted">Ordenar por...</option>
          <option value="A-z">A-z</option>
          <option value="Z-a">Z-a</option>
          <option value="L-H">Lower</option>
          <option value="H-L">Higher</option>
        </select>
      </div>
      <div className="filterContainer">
        <span>Filtrar dietas:</span>
        <select onChange={setFilterByDietHandler} className="selectMain">
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
        <select onChange={setFilterBySourceHandler} className="selectMain">
          <option value="allRecipes">Todas</option>
          <option value="apiRecipes">Recetas Originales</option>
          <option value="dbRecipes">Recetas Creadas por Vos!</option>
        </select>
      </div>
      <div>
        <input
          type="search"
          placeholder="Recetas"
          autoComplete="off"
          onChange={setLocalNameHandler}
          value={localName}
        />

        <button onClick={onSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default ToolBar;
