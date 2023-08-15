import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import frustratedChefImage from "../../assets/chef-frustrado.jpg";

const CardsContainer = ({ currentRecipes }) => {
  return (
    <div className={style.container}>
      {currentRecipes.length > 0 ? (
        currentRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            summary={recipe.summary}
            healthScore={recipe.healthScore}
            instructions={recipe.instructions}
            created={recipe.created}
            diets={recipe.diets}
          />
        ))
      ) : (
        <div className={style.noRecipes}>
          <h1>No existen recetas con estos parámetros</h1>
          <div className={style.imageContainer}>
            <img
              src={frustratedChefImage}
              alt="No existen recetas"
              className={style.frustratedImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
