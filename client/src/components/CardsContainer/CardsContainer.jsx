import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipesCopy);
  return (
    <div className={style.container}>
      {recipes.map((recipe) => {
        return (
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
        );
      })}
    </div>
  );
};

export default CardsContainer;
