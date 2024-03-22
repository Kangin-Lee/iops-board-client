import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as D from "../styled-components/DetailStyled";
import axios from "axios";
import CommentItem from "../components/CommentItem";
import { useNavigate, useParams } from "react-router-dom";

const Detail = ({ isLogin }) => {
  const [detailContents, setDetailContents] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const [handelComment, sethandelComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`)
      .then((response) => {
        const detailData = response.data;
        console.log(detailData);
        setDetailContents(detailData);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, []);

  const writeComment = (e) => {
    console.log(e.target.value);
    sethandelComment(e.target.value);
  };

  // 댓글 api 보내기--------------------------------------------
  const addComment = (e) => {
    e.preventDefault();

    if(handelComment===""){
      alert("댓글을 작성해 주세요.")
    }else{
      console.log("최종 내용은?: ",handelComment);
      postComent(handelComment);
      console.log("댓글 작성 완료");
      setCommentNum(commentNum + 1);
    }
  };

  const postComent = async (comment) =>{
    const response = await axios.post(`http://localhost:8080/comment/${id}`, comment);
    console.log(response);
  }

  // 수정하러 가기-=-----------------------------------------
  const goToUpdate = () =>{
    navigate(`/update/${id}`)
  }

  // 삭제하기--------------------------------------------------
  const deleteContents = async() =>{
    try{
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      const {data:responseData} = response;

      if(responseData === "delete"){
        alert("삭제가 완료되었습니다.");
        navigate("/");
      }

    }catch(error){
      console.log("삭제 에러", error)
    }
  }

  return (
    <Container>
      <Navbar />
      <D.DetailWrapper>
        <div>글 번호: {detailContents?.id}</div>
        <D.DetailTitle>
          <span>제목</span>
          <div>{detailContents?.title}</div>
        </D.DetailTitle>

        <D.DetailContentsInfo>
          <D.Writer lg={5} className="detail-contents-info">
            <span>작성자</span>
            <div className="writer-name">{detailContents?.writer}</div>
          </D.Writer>
          <D.WriteTime lg={4} className="detail-contents-info">
            <span>시간</span>
            <div>{detailContents?.updateTime}</div>
          </D.WriteTime>
          <D.ViewCount lg={3} className="detail-contents-info">
            <span>조회수</span>
            <div>{detailContents?.count}</div>
          </D.ViewCount>
        </D.DetailContentsInfo>

        <D.DetailContents>{detailContents.contents}</D.DetailContents>

        {/* 수정 삭제 버튼---------------------------------------------- */}
        <D.UpdateAndDeleteButton>
          <D.UpdateButton onClick={goToUpdate}>수 정</D.UpdateButton>
          <D.DeleteButton onClick={deleteContents}>삭 제</D.DeleteButton>
        </D.UpdateAndDeleteButton>
        {/* ----------------------------------------------------------- */}

        <hr />
        <D.DetailComment>
          <h4>
            댓글 <p>{commentNum}</p>
          </h4>

          <D.WriteComment>
            <D.CommentTextArea
              placeholder="댓글을 입력해 주세요..."
              onChange={writeComment}
            />
            <D.CommentSubmitButton onClick={addComment} type="submit">
              등 록
            </D.CommentSubmitButton>
          </D.WriteComment>

          {/* <CommentItem handelComment={handelComment} />
          <CommentItem />
          <CommentItem /> */}
        </D.DetailComment>
      </D.DetailWrapper>
    </Container>
  );
};

export default Detail;
