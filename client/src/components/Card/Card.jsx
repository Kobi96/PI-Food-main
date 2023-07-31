import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={style.card}>
      <p>Name: {props.name}</p>
      <img src={props.image} alt="" />
      <p>Diets:{props.diets.map((diet) => diet + " ")}</p>
    </div>
  );
};

export default Card;
