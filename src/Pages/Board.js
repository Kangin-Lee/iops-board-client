import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import BoardList from "../components/BoardList";
import Write from "./Write";
import { useSelector } from "react-redux";

const Board = () => {
  const login = useSelector((state) => state.isLogin);

  return (
    <Container
      style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        fontStyle: "normal",
        fontOpticalSizing: "auto",
      }}
    >
      <Navbar />
      <BoardList />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Write />
      </div>
    </Container>
  );
};

export default Board;
