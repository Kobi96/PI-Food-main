import React from "react";
/* import { useDispatch, useSelector } from "react-redux";
import {
  orderByHealth,
  orderByRecipe,
  filterByDiets,
  filterByBdd,
} from "../../redux/actions/index"; */
import "./ToolBar.module.css";

const ToolBar = () => {
  /* const dispatch = useDispatch();

  const recipesBdd = useSelector((state) => state.recipes).filter(
    (elem) => elem.id > 10000000
  );

  const dietList = useSelector((state) => state.diets);
  const diestByName = dietList?.map((elem) => elem.nombre); */

  /* const handleChange = (event) => {
    if (event.target.value === "A-z" || event.target.value === "Z-a") {
      dispatch(orderByRecipe(event.target.value));
      setCurrentPage(0);
      setSortBy(event.target.value);
    } else {
      dispatch(orderByHealth(event.target.value));
      setCurrentPage(0);
      setSortBy(event.target.value);
    }
  }; */

  /* const handleChangeDiets = (event) => {
    dispatch(filterByDiets(event.target.value));
    setCurrentPage(0);
  };

  const handleChangeBdd = (event) => {
    dispatch(filterByBdd(event.target.value));
    setCurrentPage(0);
  }; */

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
        <select
          /* onChange={(e) => handleChangeDiets(e)} */ className="selectMain"
        >
          <option value="allDiets">Todas las dietas</option>
          {/* {diestByName?.map((el) => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          })} */}
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
