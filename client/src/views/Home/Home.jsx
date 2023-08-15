import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRecipesCopy } from "../../redux/actions";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const globalRecipes = useSelector((state) => state.recipes);
  const globalRecipesCopy = useSelector((state) => state.recipesCopy);
  const filters = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const recipesByName = useSelector((state) => state.recipesByName);
  const name = useSelector((state) => state.name);

  const [recipes, setRecipes] = useState(globalRecipesCopy);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  useEffect(() => {
    const list = globalRecipes
      .filter((recipe) => {
        if (filters.source === "apiRecipes") return !recipe.created;
        if (filters.source === "dbRecipes") return recipe.created;
        return true;
      })
      .filter((recipe) => {
        if (filters.diet === "allDiets") return true;
        return recipe.diets.toLowerCase().includes(filters.diet);
      })
      .filter((recipe) => {
        if (!name) return true;
        return recipesByName.some(
          (recipe2) =>
            recipe2.name.toLowerCase().includes(name.toLowerCase()) &&
            recipe.name.toLowerCase().includes(name.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sort === "Z-a") {
          return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        }

        if (sort === "A-z") {
          return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
        }
        if (sort === "H-L") {
          return a.healthScore > b.healthScore ? -1 : 1;
        }
        if (sort === "L-H") {
          return a.healthScore < b.healthScore ? -1 : 1;
        }
        return 0;
      });
    console.log({ list, filters, sort, name, recipesByName });
    setRecipes(list);
    dispatch(setRecipesCopy(list));
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [filters.source, filters.diet, sort, name, recipesByName]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      <h1 className={style.homeTitle}>Qué te apetece hoy?</h1>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />
      <CardsContainer currentRecipes={currentRecipes} />
    </div>
  );
};

export default Home;
