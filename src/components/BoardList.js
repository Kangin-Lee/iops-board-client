import React, { useEffect } from "react";
import * as B from "../styled-components/BoardListStyled";
import BoardItem from "./BoardItem";
import Spinner from "react-bootstrap/Spinner";
import { useBoardData } from "../API/boardApiService";
import PageNation from "./PageNation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setTotalPages } from "../redux/action";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 글 목록 페이지
 * </pre>
 */

const BoardList = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  // 리액트 쿼리로 서버에서 게시판 리스트 받아오기----------------
  const { isLoading, data, isError, error, refetch } = useBoardData();
  // ----------------------------------------------------------

  //페이지가 바뀔 때마다 게시판 api 호출 및 totalPages 설정
  useEffect(() => {
    refetch();

    // 데이터가 유효하고, totalPages 속성이 존재하는지 확인
    if (data && data?.totalPages) {
      dispatch(setTotalPages(data.totalPages)); 
    }
  }, [currentPage]);

  const onPageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  //에러 발생 시 보이는 화면
  if (isError) {
    return <B.ErrorMessage>😥 {error.message}</B.ErrorMessage>;
  }

  //로딩 시 보이는 화면
  if (isLoading) {
    return (
      <B.RoadingSpinner>
        <Spinner animation="border" className="loadingSpinner" />
      </B.RoadingSpinner>
    );
  }

  //정상적으로 api가 호출되었을 때 보이는 화면
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

      <PageNation onPageChange={onPageChange} totalPages={data.totalPages} />
    </B.BoardWapper>
  );
};

export default BoardList;
