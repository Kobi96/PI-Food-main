import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = (props) => {
  return (
    <div className={style.card}>
      <Link to={`/detail/${props.id}`}>
        <h1>{props.name}</h1>
      </Link>
      <p>Diets:{props.diets.map((diet) => diet + " ")}</p>
      <img src={props.image} alt="" />
    </div>
  );
};

export default Card;
