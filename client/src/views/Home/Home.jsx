import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";

const Home = () => {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!recipes) dispatch(getRecipes());
    dispatch(getDiets());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>Qué te apetece hoy?</h1>
      <CardsContainer />
    </>
  );
};

export default Home;
