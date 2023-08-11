import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipesCopy);
  return (
    <div className={style.container}>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
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
        <h1>No existen recetas con estos parámetros</h1>
      )}
    </div>
  );
};

export default CardsContainer;
