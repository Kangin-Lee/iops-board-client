import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import BoardList from "../components/BoardList";
import PageNation from "../components/PageNation";
import Write from "./Write";
import { useSelector } from "react-redux";

const Board = () => {
  const login = useSelector(state=>state.isLogin);
  console.log("@@@@@", login);

  return (
    <Container style={{fontFamily:"'Noto Sans KR', sans-serif", fontStyle:"normal", fontOpticalSizing:"auto"}}>
      <Navbar/>
      <BoardList/>
      <div style={{display:"flex", justifyContent:"end"}}>
      <Write/>
      </div>
      {/* <PageNation/> */}
    </Container>
  );
};

export default Board;
