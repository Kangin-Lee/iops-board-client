import React from "react";
import * as P from "../styled-components/PageNationStyled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PageNation = ({ onPageChange }) => {
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);

  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <P.PageNationWapper>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <P.PageNumber key={number} className="page-item">
            <Link
              onClick={() => onPageChange(number)}
              className={
                number === currentPage ? "page-active page-num" : "page-num page-non-focus"
              }
            >
              {number + 1}
            </Link>
          </P.PageNumber>
        ))}
      </ul>
    </P.PageNationWapper>
  );
};

export default PageNation;
