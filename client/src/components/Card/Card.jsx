import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = (props) => {
  return (
    <div className={style.card}>
      <img src={props.image} alt="" />
      <div className={style.info}>
        <Link className={style.cardLink} to={`/detail/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
        <p>Dietas:{props.diets}</p>
      </div>
    </div>
  );
};

export default Card;
