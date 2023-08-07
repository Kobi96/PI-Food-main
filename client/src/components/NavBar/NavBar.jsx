import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to={"/home"}>HOME</Link>
      <Link to={"/create"}>FORM</Link>
      <SearchBar />
    </div>
  );
};

export default NavBar;
