import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../redux/actions";
import { useEffect } from "react";
import style from "./Detail.module.css";

const Detail = () => {
  const recipe = useSelector((state) => state.recipeDetail);
  const id = useParams().id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getRecipeById(id));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>{recipe?.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      <h2>{recipe?.healthScore}</h2>
      <h2>{recipe?.instructions}</h2>
      <h2>{recipe?.diets}</h2>
      <h4>{recipe?.id}</h4>
      <img className={style.image} src={recipe.image} alt="char detail" />
    </div>
  );
};

export default Detail;
