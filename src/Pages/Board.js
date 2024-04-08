import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import BoardList from "../components/BoardList";
import Write from "./Write";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 전체를 감싸는 용도
 * </pre>
 */

const Board = () => {

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
