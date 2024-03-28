import React, { useEffect,  useState } from "react";
import {  Container, Spinner} from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as D from "../styled-components/DetailStyled";
import axios from "axios";
import CommentItem from "../components/CommentItem";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as B from "../styled-components/BoardListStyled";


const Detail = ({ isLogin }) => {
  const [comments, setComments] = useState([]);
  const [commentsData, setCommentsData] = useState([]); //댓글 api
  const [handelComment, sethandelComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //디테일 정보 불러오기------------------------------------------

  const detailData = () => {
    return axios.get(`http://localhost:8080/board/${id}`);
  }

  const {isLoading, data, isError, error} = useQuery({
    queryKey:['get'],
    queryFn:detailData,
    retry:2,
    select:(data) => {
      return data.data;
    }
  })

  // 댓글 api 보내기--------------------------------------------
  const writeComment = (e) => {
    console.log(e.target.value);
    sethandelComment(e.target.value);
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      addComment();
    }
  }

  const addComment = (e) => {
    // e.preventDefault();

    if(!localStorage.getItem("loggedInUserEmail")){
      alert("로그인한 유저만 사용 가능합니다.")
      navigate("/login");
    }else if (handelComment === "") {
      alert("댓글을 작성해 주세요.");
    } else {
      console.log("최종 내용은?: ", handelComment);
      postComment(handelComment);
      console.log("댓글 작성 완료");
    }
  };

  const postComment = async (contents) => {
    const email = localStorage.getItem("loggedInUserEmail");
    console.log(contents, email);
    const response = await axios.post(
      `http://localhost:8080/board/${id}/comments`,
      { contents, email }
    );
    console.log("댓글", response.data);
    setComments(response);
  };

  //댓글 api 불러오기------------------------------------------

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}/comments`)
      .then((response) => {
        const commentData = response.data;
        console.log("데이터:", commentData);
        setCommentsData(commentData);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  }, [comments]);

  // 수정하러 가기-=-------------------------------------------
  const goToUpdate = () => {
    if (!!localStorage.getItem("loggedInUserEmail")) {
      navigate(`/update/${id}`);
    } else {
      alert("로그인한 사용자만 이용 가능합니다.");
      navigate("/login");
    }
  };

  // 삭제하기--------------------------------------------------
  const deleteContents = async () => {
    if (!!localStorage.getItem("loggedInUserEmail")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/delete/${id}`
        );
        const { data: responseData } = response;

        if (responseData === "delete") {
          alert("삭제가 완료되었습니다.");
          navigate("/");
        }
      } catch (error) {
        console.log("삭제 에러", error);
      }
    } else {
      alert("로그인한 사용자만 이용 가능합니다.");
      navigate("/login");
    }
  };

  if (isError) {
    return(
      <B.ErrorMessage>😥 {error.message}</B.ErrorMessage>
    )

  }

  if (isLoading) {
    return (
      <B.RoadingSpinner>
        <Spinner animation="border" className="loadingSpinner" />
      </B.RoadingSpinner>
    );
  }

  return (
    <Container>
      <Navbar />
      <D.DetailWrapper>
        <div>글 번호: {data?.id}</div>
        <D.DetailTitle>
          <span>제목</span>
          <div>{data?.title}</div>
        </D.DetailTitle>

        <D.DetailContentsInfo>
          <D.Writer lg={5} className="detail-contents-info">
            <span>작성자</span>
            <div className="writer-name">{data?.email}</div>
          </D.Writer>
          <D.WriteTime lg={4} className="detail-contents-info">
            <span>시간</span>
            <div>
              {data?.updateTime == null
                ? data.createDate
                : data.updateTime}
            </div>
          </D.WriteTime>
          <D.ViewCount lg={3} className="detail-contents-info">
            <span>조회수</span>
            <div>{data?.count}</div>
          </D.ViewCount>
        </D.DetailContentsInfo>

        <D.DetailContents>{data.contents}</D.DetailContents>

        {/* 수정 삭제 버튼---------------------------------------------- */}
        {data?.email == localStorage.getItem("loggedInUserEmail") ? (
          <D.UpdateAndDeleteButton>
            <D.UpdateButton onClick={goToUpdate}>수 정</D.UpdateButton>
            <D.DeleteButton onClick={deleteContents}>삭 제</D.DeleteButton>
          </D.UpdateAndDeleteButton>
        ) : (
          ""
        )}

        {/* ----------------------------------------------------------- */}

        <hr />
        <D.DetailComment>
          <h4>
            댓글 <p>{commentsData.length}</p>
          </h4>

          <D.WriteComment>
            <D.CommentTextArea
              placeholder="댓글을 입력해 주세요..."
              onChange={writeComment}
              autoFocus
              onKeyDown={handleKeyPress}
            />
            <D.CommentSubmitButton onClick={addComment} type="submit">
              등 록
            </D.CommentSubmitButton>
          </D.WriteComment>

          {commentsData.map((list, key) => (
            <>
              <CommentItem list={list} key={key}/>
            </>
          ))}
        </D.DetailComment>
      </D.DetailWrapper>
    </Container>
  );
};

export default Detail;
