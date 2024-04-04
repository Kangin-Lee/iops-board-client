import React, { useEffect, useState } from "react";
import * as B from "../styled-components/BoardItemStyled";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { LoginErrorAlert, showFailAlert } from "../Alert/ErrorAlert";
import { useGetComment } from "../API/apiService";

const BoardItem = ({ data }) => {
  const navigate = useNavigate();
  const [selectItemId, setSelectItemId] = useState(null);

  const isLogin = useSelector(state => state.isLogin); // 리덕스에서 로그인 상태 가져오기
  const boardList = data.content;

  //상세 글 보러가기--------------------------------------------------
  const showDetailContents = (id) => {
    console.log("클릭했을 때 ", id);
    setSelectItemId(id);
    if (isLogin) {
      console.log(isLogin);
      navigate(`/board/${id}`);
    } else {
      showFailAlert("로그인한 유저만 이용 가능합니다.");
      navigate("/login");
    }
  };

    // data가 유효한지와 배열인지 확인
    if (!Array.isArray(data.content)) {
      return null; // data가 배열이 아니면 아무것도 렌더링하지 않음
    }

  return (
    <>
      {boardList.map((list,key) => (
        <B.BoardWapper onClick={()=>showDetailContents(list.id)}>
          <B.BoardContentsItem>
            <li style={{ width: "10%" }}>{list.id}</li>
            <li style={{ width: "40%" }}>{list.title}</li>
            <li style={{ width: "20%" }}>{list.email == null?"알수없음":(list.email).split("@")[0]}</li>
            <li style={{ width: "20%" }}>{list.updateTime === null?list.createDate:list.updateTime}</li>
            <li style={{ width: "10%" }}>{list.count}</li>
          </B.BoardContentsItem>
        </B.BoardWapper>
      ))}
    </>
  );
};

export default BoardItem;
