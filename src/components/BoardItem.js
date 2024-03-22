import React, { useState } from "react";
import * as B from "../styled-components/BoardItemStyled";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const BoardItem = ({ isLogin, boardListItem }) => {
  const navigate = useNavigate();
  const [selectItemId, setSelectItemId] = useState(null);

  const increaseCount = async (id) => {
    console.log("아이디 값은? ",id)
    try {
      await axios.put(`http://localhost:8080/board/${id}`);
      console.log("조회수 증가 성공");
    } catch (error) {
      console.error("조회수 증가 에러: ", error);
    }
  };

  const showDetailContents = (id) => {
    console.log("클릭했을 때 ", id);
    setSelectItemId(id);
    if (isLogin) {
      console.log(isLogin);
      increaseCount(id);
      navigate(`/board/${id}`);
    } else {
      alert("로그인 이후 이용 가능합니다.");
      navigate("/login");
    }
  };

  console.log("data: ", boardListItem);
  return (
    <>
      {boardListItem.map((list) => (
        <B.BoardWapper onClick={()=>showDetailContents(list.id)}>
          <B.BoardContentsItem>
            <li style={{ width: "10%" }}>{list.id}</li>
            <li style={{ width: "40%" }}>{list.title}</li>
            <li style={{ width: "20%" }}>{list.writer}</li>
            <li style={{ width: "20%" }}>{list.updateTime}</li>
            <li style={{ width: "10%" }}>{list.count}</li>
          </B.BoardContentsItem>
        </B.BoardWapper>
      ))}
    </>
  );
};

export default BoardItem;
