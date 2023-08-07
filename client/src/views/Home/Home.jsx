import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!recipes) dispatch(getRecipes());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>Esta es la vista de Home</h1>
      <CardsContainer />
    </>
  );
};

export default Home;
