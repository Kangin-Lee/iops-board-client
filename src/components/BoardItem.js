import React, { useState } from "react";
import * as B from "../styled-components/BoardItemStyled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { showFailAlert } from "../Alert/ErrorAlert";
import { getCookie } from "../cookie/ReactCookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 글 아이템 컴포넌트
 * </pre>
 */

const BoardItem = ({ data }) => {
  const navigate = useNavigate();
  const [selectItemId, setSelectItemId] = useState(null);

  const isLogin = getCookie("userLoginInfo");
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
      {boardList.map((list, key) => (
        <B.BoardWapper onClick={() => showDetailContents(list.id)}>
          <B.BoardContentsItem>
            <li style={{ width: "10%" }}>{list.id}</li>
            <li style={{ width: "40%" }}>{list.title}</li>
            <li style={{ width: "20%" }}>
              {list.email == null ? "알수없음" : list.email.split("@")[0]}
            </li>
            <li style={{ width: "20%" }}>
              {list.updateTime === null ? list.createDate : list.updateTime}
            </li>
            <li style={{ width: "10%" }}>{list.count}</li>
          </B.BoardContentsItem>
        </B.BoardWapper>
      ))}
    </>
  );
};

export default BoardItem;
