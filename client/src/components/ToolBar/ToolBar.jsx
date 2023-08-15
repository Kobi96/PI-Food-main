import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSort,
  setSource,
  setDiet,
  setGlobalName,
  getRecipesByName,
} from "../../redux/actions";
import style from "./ToolBar.module.css";

const ToolBar = () => {
  const dispatch = useDispatch();
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);
  const [localName, setLocalName] = useState("");

  useEffect(() => {
    if (!localName) {
      dispatch(getRecipesByName(localName));
      dispatch(setGlobalName(localName));
    }
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
    dispatch(getRecipesByName(localName));
    dispatch(setGlobalName(localName));
  };

  return (
    <div className={style.container}>
      <span>Filtros y ordenamientos</span>
      <div>
        <select onChange={setSortRecipesHandler} className="selectMain">
          <option value="notSorted">Ordenar por...</option>
          <option value="A-z">A-z</option>
          <option value="Z-a">Z-a</option>
          <option value="L-H">Lower</option>
          <option value="H-L">Higher</option>
        </select>
        <input
          type="search"
          placeholder="Recetas"
          autoComplete="off"
          onChange={setLocalNameHandler}
          value={localName}
        />

        <button onClick={onSearch}>Buscar</button>
      </div>
      <div>
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

        <select onChange={setFilterBySourceHandler} className="selectMain">
          <option value="allRecipes">Todas</option>
          <option value="apiRecipes">Recetas Originales</option>
          <option value="dbRecipes">Recetas Creadas por Vos!</option>
        </select>
      </div>
    </div>
  );
};

export default ToolBar;
