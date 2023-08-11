import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipes, getDiets } from "../../redux/actions";
const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Bienvenidos!</h1>
      <div>
        <Link to="/home">Ingresar</Link>
      </div>
    </div>
  );
};

export default Landing;
