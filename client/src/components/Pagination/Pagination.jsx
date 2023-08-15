import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
