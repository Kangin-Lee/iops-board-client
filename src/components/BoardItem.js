import React, { useState } from "react";
import * as B from "../styled-components/BoardItemStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

const BoardItem = ({ isLogin, data }) => {
  const navigate = useNavigate();
  const [selectItemId, setSelectItemId] = useState(null);
  isLogin = !!localStorage.getItem("loggedInUserEmail");

  const increaseCount = async (id) => {
    console.log("아이디 값은? ",id)
    try {
      await axios.put(`http://localhost:8080/board/${id}`);
      console.log("조회수 증가 성공");
    } catch (error) {
      console.error("조회수 증가 에러: ", error);
    }
  };

  //리액트 쿼리로 서버에서 게시판 조회 수 증가 시키기----------------
  // const fetchData = () => {
  //   return axios.put(`http://localhost:8080/board/${id}`);
  // }

  // const {isLoading, data, isError, error} = useQuery({
  //   queryKey:["put"],
  //   queryFn:fetchData,
  //   select:(count) => {
  //     return data.data;
  //   }
  // })

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

  return (
    <>
      {data.map((list,key) => (
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
