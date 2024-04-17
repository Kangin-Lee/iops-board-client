import React from "react";
import * as P from "../styled-components/PageNationStyled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";

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
    const pageNumbers = []; // 현재 페이지 주변에 표시될 페이지 번호들을 저장하는데 사용
    const visiblePages = 5; // 현재 페이지 주변에 보여질 페이지 수

    //현재 페이지 주변에 보여질 첫 번째 페이지 번호를 계산(음수라면 0)
    let startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));

    // 현재 페이지 주변에 보여질 마지막 페이지 번호를 계산
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
          <Link
            onClick={() => onPageChange(0)}
            className="first-page, page-non-focus page-num"
          >
            <PiCaretDoubleLeftBold /> {/*아이콘 */}
          </Link>
          <Link
            className="before-page page-non-focus page-num"
            onClick={() =>
              onPageChange(currentPage === 0 ? 0 : currentPage - 1)
            }
          >
            <PiCaretLeftBold />
          </Link>
        </P.PageNumber>
        {renderPageNumbers()}
        <P.PageNumber>
          <Link
            className="after-page page-non-focus page-num"
            onClick={() =>
              onPageChange(
                currentPage === totalPages - 1
                  ? totalPages - 1
                  : currentPage + 1
              )
            }
          >
            <PiCaretRightBold />
          </Link>
          <Link
            onClick={() => onPageChange(totalPages - 1)}
            className="page-non-focus page-num"
          >
            <PiCaretDoubleRightBold /> {/*아이콘 */}
          </Link>
        </P.PageNumber>
      </ul>
    </P.PageNationWapper>
  );
};

export default PageNation;
