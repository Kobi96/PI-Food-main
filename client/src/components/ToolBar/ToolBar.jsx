import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSort,
  setSource,
  setDiet,
  setGlobalName,
  getRecipesByName,
} from "../../redux/actions";
import "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);
  const [localName, setLocalName] = useState("");

  useEffect(() => {
    if (!localName) dispatch(setGlobalName(""));
    dispatch(getRecipesByName(localName));
    // eslint-disable-next-line
  }, [localName]);

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
