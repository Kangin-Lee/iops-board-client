import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as U from "../styled-components/UpdateStyled";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [detailContents, setDetailContents] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const titleInputRef = useRef(null);
  const contentsTextAreaRef = useRef(null);

  useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaa");
    axios
      .get(`http://localhost:8080/board/${id}`)
      .then((response) => {
        const detailData = response.data;
        console.log(detailData);
        setDetailContents(detailData);
        // 페이지가 처음 렌더링될 때 detailContents?.title을 초기 값으로 설정
        setTitleValue(detailData?.title || "");
        setContentsValue(detailData?.contents || "");
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);



  const handleInputChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setContentsValue(e.target.value);
  };


  //수정 완료 버튼 db에 저장--------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const contents = contentsTextAreaRef.current.value;
    // title과 contents를 서버로 전송
    console.log("제출된 제목:", title);
    console.log("제출된 내용:", contents);

    try{
      const response = await axios.put(`http://localhost:8080/update/${id}`, {title, contents});
      const {data:responseData} = response;

      if(title ==="" || contents ===""){
        alert("제목 혹은 내용을 입력해 주세요.");
      }else if(responseData==="success"){
        alert("수정이 완료되었습니다");
        navigate(`/board/${id}`);
      }
    }catch(error){
      console.log('업데이트 에러', error);
    }

  };

  return (
    <Container>
      <Navbar />
      <U.DetailWrapper onSubmit={handleSubmit}>
        <div>글 번호: {detailContents?.id}</div>
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
          <U.Writer lg={5} className="detail-contents-info">
            <span>작성자</span>
            <div className="writer-name">{detailContents?.email}</div>
          </U.Writer>
          <U.WriteTime lg={4} className="detail-contents-info">
            <span>시간</span>
            <div>{detailContents?.updateTime}</div>
          </U.WriteTime>
          <U.ViewCount lg={3} className="detail-contents-info">
            <span>조회수</span>
            <div>{detailContents?.count}</div>
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
