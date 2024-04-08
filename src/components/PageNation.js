import React, { useEffect } from "react";
import * as P from "../styled-components/PageNationStyled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-01
 * 용도 : 게시판 페이지네이션 컴포넌트
 * </pre>
 */

const PageNation = ({ onPageChange,totalPages }) => {
  const currentPage = useSelector((state) => state.currentPage);
  // const totalPages = useSelector((state) => state.totalPages);

  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(()=>{
    console.log("토탈 페이지",totalPages)
  },[totalPages])

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
