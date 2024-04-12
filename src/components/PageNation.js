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

const PageNation = ({ onPageChange, totalPages }) => {
  const currentPage = useSelector((state) => state.currentPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // 현재 페이지 주변에 보여질 페이지 수

    let startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (totalPages <= visiblePages) {
      startPage = 0;
      endPage = totalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <P.PageNumber key={number} className="page-item">
        <Link
          onClick={() => onPageChange(number)}
          className={
            number === currentPage
              ? "page-active page-num"
              : "page-num page-non-focus"
          }
        >
          {number + 1}
        </Link>
      </P.PageNumber>
    ));
  };

  return (
    <P.PageNationWapper>
      <ul className="pagination">
        <P.PageNumber>
          <Link onClick={() => onPageChange(0)} className="first-page, page-non-focus page-num">
            {"<<"}
          </Link>
        </P.PageNumber>
        {renderPageNumbers()}
        <P.PageNumber>
          <Link
            onClick={() => onPageChange(totalPages - 1)}
            className="page-non-focus page-num"
          >
            {">>"}
          </Link>
        </P.PageNumber>
      </ul>
    </P.PageNationWapper>
  );
};

export default PageNation;
