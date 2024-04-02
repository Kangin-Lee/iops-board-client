import React, { useEffect, useState, useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as U from "../styled-components/UpdateStyled";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUpdateBoard, usePutUpdateContents } from "../API/apiService";
import * as B from "../styled-components/BoardListStyled";

const Update = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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
  // const {isError:updateIsError, error:updateError, refetch, data:updateData} = usePutUpdateContents(id,title,);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const contents = contentsTextAreaRef.current.value;
    // title과 contents를 서버로 전송
    console.log("제출된 제목:", title);
    console.log("제출된 내용:", contents);

    
    // if (title === "" || contents === "") {
    //   alert("제목 혹은 내용을 입력해 주세요.");
    // } else if (data === "success") {
    //   refetch(title, contents);
    //   alert("수정이 완료되었습니다");
    //   navigate(`/board/${id}`);
    // }

    try {
      const response = await axios.put(`http://localhost:8080/update/${id}`, {
        title,
        contents,
      });
      const { data: responseData } = response;

      if (title === "" || contents === "") {
        alert("제목 혹은 내용을 입력해 주세요.");
      } else if (responseData === "success") {
        alert("수정이 완료되었습니다");
        navigate(`/board/${id}`);
      }
    } catch (error) {
      console.log("업데이트 에러", error);
    }
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
