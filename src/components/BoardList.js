import React, { useEffect } from "react";
import * as B from "../styled-components/BoardListStyled";
import BoardItem from "./BoardItem";
import Spinner from "react-bootstrap/Spinner";
import { useBoardData } from "../API/apiService";
import PageNation from "./PageNation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setTotalPages } from "../redux/action";

const BoardList = () => {
  const currentPage = useSelector((state) => state.currentPage);
  // const totalPages = useSelector((state) => state.totalPages);
  const dispatch = useDispatch();

  // 리액트 쿼리로 서버에서 게시판 리스트 받아오기----------------
  const { isLoading, data, isError, error, refetch } =
    useBoardData();
  // ----------------------------------------------------------

  useEffect(() => {
    refetch();

    // 데이터가 유효하고, totalPages 속성이 존재하는지 확인
    if (data && data.totalPages) {
      dispatch(setTotalPages(data.totalPages)); // totalPages 속성을 사용하여 totalPages 설정
    }
  }, [currentPage]);

  const onPageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (isError) {
    return <B.ErrorMessage>😥 {error.message}</B.ErrorMessage>;
  }

  if (isLoading) {
    return (
      <B.RoadingSpinner>
        <Spinner animation="border" className="loadingSpinner" />
      </B.RoadingSpinner>
    );
  }

  return (
    <B.BoardWapper>
      <B.BoardHeader>
        <B.BoardTopTitleArea>
          <li style={{ width: "10%" }}>번호</li>
          <li style={{ width: "40%" }}>제목</li>
          <li style={{ width: "20%" }}>작성자</li>
          <li style={{ width: "20%" }}>작성일</li>
          <li style={{ width: "10%" }}>조회수</li>
        </B.BoardTopTitleArea>
      </B.BoardHeader>

      <BoardItem data={data} />

      <PageNation onPageChange={onPageChange} />
    </B.BoardWapper>
  );
};

export default BoardList;
