import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as D from "../styled-components/DetailStyled";
import axios from "axios";
import CommentItem from "../components/CommentItem";
import { useNavigate, useParams } from "react-router-dom";
import * as B from "../styled-components/BoardListStyled";
import { useCommentDelete, useDetailData, useGetComment, usePostComment } from "../API/apiService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsData, setPostComments } from "../redux/action";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postComments = useSelector((state)=>state.postComments); // 댓글 등록하기
  const commentsData = useSelector((state)=>state.commentsData); //댓글 api
  const [handelComment, sethandelComment] = useState(""); // 댓글 내용

  //디테일 정보 불러오기------------------------------------------
  const { isLoading, data, isError, error } = useDetailData(id);

  // 댓글 api 보내기--------------------------------------------
  const writeComment = (e) => {
    console.log(e.target.value);
    sethandelComment(e.target.value);
  };

// 댓글 등록 기능---------------------------------------------
  const addComment = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("loggedInUserEmail")) {
      alert("로그인한 유저만 사용 가능합니다.");
      navigate("/login");
    } else if (handelComment === "") {
      alert("댓글을 작성해 주세요.");
    } else {
      postComment(handelComment);
      console.log("댓글 작성 완료");
    }
  };

  // const postData = () => {
  //   return axios.post(
  //     `http://localhost:8080/board/${id}/comments`,
  //     { contents, email }
  //   );
  // }
  // const {isLoading, data, isError, error, refetch} = useQuery({
  //   queryKey:["commentPost"],
  //   queryFn: postData,
  //   retry: 2,
  //   select: (data) => {
  //     return data.data;
  //   }
  // })

  const postComment = async (contents) => {
    const email = localStorage.getItem("loggedInUserEmail");
    console.log(contents, email);
    const response = await axios.post(
      `http://localhost:8080/board/${id}/comments`,
      { contents, email }
    );
    console.log("댓글", response.data);
    dispatch(setPostComments(response));
  };


  //댓글 api 불러오기------------------------------------------
  // const {refetch:getCommentRefetch, isLoading:getCommentLoading, isError:getCommentIsError, error:getCommentError, data:getCommentData} = useGetComment(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}/comments`)
      .then((response) => {
        const commentData = response.data;
        dispatch(setCommentsData(commentData));
        console.log("데이터:", commentData);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
    // setCommentsData(getCommentData);
    // getCommentRefetch();
  }, [postComments]);
  console.log("댓글@@@@@@@@",commentsData);

  //  수정하러 가기-=-------------------------------------------
  const goToUpdate = () => {
    if (!!localStorage.getItem("loggedInUserEmail")) {
      navigate(`/update/${id}`);
    } else {
      alert("로그인한 사용자만 이용 가능합니다.");
      navigate("/login");
    }
  };

  // 게시글 삭제하기--------------------------------------------------
  // const {isLoading:deleteLoading, isError:deleteIsError, error:deleteError, data:deleteData, refetch:deleteFetch} = useQuery(id);

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
      // deleteFetch();
      // if(deleteData === "delete"){
      //   alert("삭제가 완료되었습니다.")
      //   navigate("/");
      // }
      
    } else {
      alert("로그인한 사용자만 이용 가능합니다.");
      navigate("/login");
    }
  };

  


// ----------------------------------------------------------------/
  if (isError) {
    return <B.ErrorMessage>😥 {error.message}</B.ErrorMessage>;
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
          <D.Writer lg={5}>
            <span>작성자</span>
            <div>{data?.email}</div>
          </D.Writer>
          <D.WriteTime lg={4}>
            <span>시간</span>
            <div>
              {data?.updateTime == null ? data.createDate : data.updateTime} 
            </div>
          </D.WriteTime>
          <D.ViewCount lg={3}>
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
              onChange={writeComment}
            />
            <D.CommentSubmitButton onClick={addComment}>
              등 록
            </D.CommentSubmitButton>
          </D.WriteComment>

          {commentsData.map((list, key) => (
            <>
              <CommentItem list={list} key={key} />
            </>
          ))}
        </D.DetailComment>
      </D.DetailWrapper>
    </Container>
  );
};

export default Detail;
