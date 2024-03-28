import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import BoardList from "../components/BoardList";
import styled from "styled-components";
import PageNation from "../components/PageNation";
import { useNavigate } from "react-router-dom";
import Write from "./Write";

const Board = ({isLogin, setIsLogin}) => {
  const isLocalStorage = !!localStorage.getItem("loggedInUserEmail");
  console.log(isLocalStorage)
  return (
    <Container style={{fontFamily:"'Noto Sans KR', sans-serif", fontStyle:"normal", fontOpticalSizing:"auto"}}>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <BoardList isLogin={isLogin}/>
      <div style={{display:"flex", justifyContent:"end"}}>
      <Write isLogin={isLogin}/>
      </div>
      {/* <PageNation/> */}
    </Container>
  );
};

export default Board;
