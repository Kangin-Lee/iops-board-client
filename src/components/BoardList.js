import React, { useEffect, useState } from "react";
import * as B from "../styled-components/BoardListStyled";
import BoardItem from "./BoardItem";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const BoardList = ({ isLogin }) => {
  const [boardListItem, setBoardListItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //로딩 스피너

  //게시판 리스트 서버에서 받아오기-------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8080/board")
      .then((response) => {
        const boardData = response.data;
        console.log(boardData);
        setBoardListItem(boardData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);
  // ----------------------------------------------------------
  


  if (isLoading) {
    return (
      <B.RoadingSpinner>
        <Spinner animation="border" className="loadingSpinner" />
      </B.RoadingSpinner>
    );
  } else {
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

        <BoardItem isLogin={isLogin} boardListItem={boardListItem} />
      </B.BoardWapper>
    );
  }
};

export default BoardList;
