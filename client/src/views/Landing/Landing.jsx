import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"; // Importar el archivo CSS Module

const Landing = () => {
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
