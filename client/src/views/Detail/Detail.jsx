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
  console.log(recipe.diets);
  return (
    <div className={style.container}>
      <div className={style.nameImage}>
        <h1 className={style.title}>{recipe?.name}</h1>
        <img className={style.image} src={recipe.image} alt="char detail" />
        <div className={style.summary}>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
      </div>
      <div className={style.info}>
        <h2 className={style.subtitle}>
          Puntaje de comida Saludable: {recipe?.healthScore}
        </h2>
        <h2 className={style.subtitle}>Instrucciones:</h2>
        <p className={style.instructions}> {recipe?.instructions}</p>
        <h2 className={style.subtitle}>Dietas:</h2>
        <p className={style.diets}>{recipe.diets}</p>
        <h4 className={style.id}>ID: {recipe?.id}</h4>{" "}
      </div>
    </div>
  );
};

export default Detail;
