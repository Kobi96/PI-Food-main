import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./NavBar.module.css";
import ToolBar from "../ToolBar/ToolBar";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to={"/home"}>
        <button className={style.navButton}>HOME</button>
      </Link>
      <Link className={style.link} to={"/create"}>
        <button className={style.navButton}>FORM</button>
      </Link>
      <ToolBar />
    </div>
  );
};

export default NavBar;
