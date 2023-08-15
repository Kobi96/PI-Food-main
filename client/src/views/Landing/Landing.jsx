import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { useSelector } from "react-redux";

const Landing = () => {
  const globalRecipes = useSelector((state) => state.recipes);
  const dietList = useSelector((state) => state.diets);
  const dietsByName = dietList.map((diet) => diet.name);

  console.log("Recetas:", globalRecipes);
  console.log("Dietas:", dietsByName);
  return (
    <div className={styles.backgroundImage}>
      <div className={styles.welcomeSign}>
        <h1 className={styles.title}>Bienvenido!</h1>
        <div className={styles.buttonContainer}>
          <Link to="/home" className={styles.link}>
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
