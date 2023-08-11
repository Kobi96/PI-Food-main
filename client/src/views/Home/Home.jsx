import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
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
