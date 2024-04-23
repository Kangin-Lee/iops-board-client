import React, { useEffect, useState, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as U from "../styled-components/UpdateStyled";
import { useParams } from "react-router-dom";
import { useGetUpdateBoard } from "../API/boardApiService";
import * as B from "../styled-components/BoardListStyled";
import { usePutUpdateContents } from "../API/boardApiService";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 글 수정 페이지
 * </pre>
 */

const Update = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const { id } = useParams();

  const titleInputRef = useRef(null);
  const contentsTextAreaRef = useRef(null);

  //기존 글 정보 가져오기---------------------------------------------
  const { isLoading, data, isError, error } = useGetUpdateBoard(id);

  useEffect(() => {
    if (data) {
      setTitleValue(data.title || "");
      setContentsValue(data.contents || "");
    }
  }, [data]); // data가 변경될 때만 실행
  // ----------------------------------------------------------------

  const handleInputChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setContentsValue(e.target.value);
  };

  //수정 완료 버튼 db에 저장--------------------------------------------------------
  const {mutate} = usePutUpdateContents(id); //useMutation을 이용해 put 작업 실행

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const contents = contentsTextAreaRef.current.value;
    
    // title과 contents를 서버로 전송
    mutate({id, title, contents});
  };

  if (isError) {
    return (
      <Container>
        <Navbar />
        <B.ErrorMessage>😥 {error.message}</B.ErrorMessage>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Navbar />
        <B.RoadingSpinner>
          <Spinner animation="border" className="loadingSpinner" />
        </B.RoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      <U.DetailWrapper onSubmit={handleSubmit}>
        <div>글 번호: {data?.id}</div>
        <U.DetailTitle>
          <span>제목</span>
          {/* <div>{detailContents?.title}</div> */}
          <input
            type="text"
            ref={titleInputRef}
            value={titleValue}
            placeholder="제목을 입력해 주세요."
            onChange={handleInputChange}
          />
        </U.DetailTitle>

        <U.DetailContentsInfo>
          <U.Writer lg={5}>
            <span>작성자</span>
            <div>{data?.email}</div>
          </U.Writer>
          <U.WriteTime lg={4}>
            <span>시간</span>
            <div>{data?.updateTime}</div>
          </U.WriteTime>
          <U.ViewCount lg={3}>
            <span>조회수</span>
            <div>{data?.count}</div>
          </U.ViewCount>
        </U.DetailContentsInfo>

        <U.DetailContents
          ref={contentsTextAreaRef}
          value={contentsValue}
          onChange={handleTextAreaChange}
        />

        {/* 수정 삭제 버튼---------------------------------------------- */}
        <U.UpdateAndDeleteButton>
          <U.UpdateButton>수 정</U.UpdateButton>
        </U.UpdateAndDeleteButton>
        {/* ----------------------------------------------------------- */}
      </U.DetailWrapper>
    </Container>
  );
};

export default Update;
