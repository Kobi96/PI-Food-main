import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getRecipes } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!name) {
      dispatch(getRecipes());
    }
  }, [name, dispatch]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = () => {
    dispatch(getRecipeByName(name));
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Recetas"
        autoComplete="off"
        onChange={handleChange}
        value={name}
      />

      <button onClick={onSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
