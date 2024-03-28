import React from "react";
import * as B from "../styled-components/BoardListStyled";
import BoardItem from "./BoardItem";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BoardList = () => {

  // 리액트 쿼리로 서버에서 게시판 리스트 받아오기----------------
  const fetchData = () => {
    return axios.get("http://localhost:8080/board");
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["gets"],
    queryFn: fetchData,
    retry: 2, //api를 못 불러 온다면 2번 더 api 호출을 하고 에러 메시지를 반환한다.
    select: (data) => {
      return data.data; //data.data를 data로 부르겠다.
    },
  });
  // ----------------------------------------------------------

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

      <BoardItem
        data={data}
        // boardListItem={boardListItem}
      />
    </B.BoardWapper>
  );
};

export default BoardList;
