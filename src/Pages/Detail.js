import React, { useEffect, useRef, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as D from "../styled-components/DetailStyled";
import axios from "axios";
import CommentItem from "../components/CommentItem";
import { useNavigate, useParams } from "react-router-dom";
import * as B from "../styled-components/BoardListStyled";
import {
  useCommentDelete,
  useDeletePost,
  useDetailData,
  useGetComment,
  useIncreaseCount,
  usePostComment,
} from "../API/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsData, setPostComments } from "../redux/action";
import { showFailAlert } from "../Alert/ErrorAlert";
import { showSuccessAlert } from "../Alert/SuccessAlert";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();

  const postComments = useSelector((state) => state.postComments); // 댓글 등록하기
  const commentsData = useSelector((state) => state.commentsData); //댓글 api
  const [handelComment, sethandelComment] = useState(""); // 댓글 내용

  //디테일 정보 불러오기------------------------------------------
  const { isLoading, data, isError, error } = useDetailData(id);

  //조회 수 증가-------------------------------------------------
  const {mutate} = useIncreaseCount(id);

  useEffect(()=>{
    mutate();
  },[])

  // 댓글 api 보내기--------------------------------------------
  // const writeComment = (e) => {
  //   // console.log(e.target.value);
  //   const writeComment = ref.current.value;
  //   console.log("gggggggg",writeComment);
  //   sethandelComment(writeComment)
  // };

  // 댓글 등록 기능---------------------------------------------
  const addComment = async (e) => {
    e.preventDefault();

    const writeComment = ref.current.value;
    sethandelComment(writeComment);
    console.log("@@@@@@@@@@@@@@@",handelComment);
    if (!localStorage.getItem("loggedInUserEmail")) {
      showFailAlert("로그인한 유저만 이용 가능합니다.");
      navigate("/login");
    } else if (handelComment === "") {
      showFailAlert("댓글을 작성해 주세요.");
    } else {
      const response = await postComment(handelComment);
      if (response === "success") {
        showSuccessAlert("댓글이 성공적으로 등록되었습니다.");
      } else {
        showFailAlert("댓글 등록에 실패했습니다.");
      }
    }
  };

  const {mutate:postCommentMutate} = usePostComment(); //리액트 쿼리로 댓글 등록하기

  const postComment = async (contents) => {
    const email = localStorage.getItem("loggedInUserEmail");
    return postCommentMutate({id,contents, email})
  };
  //댓글 api 불러오기------------------------------------------
  const {
    refetch: getCommentRefetch,
    isLoading: getCommentLoading,
    isError: getCommentIsError,
    error: getCommentError,
    data: getCommentData,
  } = useGetComment(id);

  useEffect(() => {
    getCommentRefetch();
  }, [addComment]);

  //----------------------------------------------------------

  //  수정하러 가기-=-------------------------------------------
  const goToUpdate = () => {
    if (!!localStorage.getItem("loggedInUserEmail")) {
      navigate(`/update/${id}`);
    } else {
      showFailAlert("로그인한 유저만 이용 가능합니다.");
      navigate("/login");
    }
  };
  //-----------------------------------------------------------

  // 게시글 삭제하기--------------------------------------------------
  const {mutate:deleteMutate} = useDeletePost();
  
  const deleteContents = async () => {
    if (!!localStorage.getItem("loggedInUserEmail")) {
      deleteMutate(id);
    } else {
      showFailAlert("로그인한 유저만 이용 가능합니다.");
      navigate("/login");
    }
  };
  // ----------------------------------------------------------------

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
        {getCommentLoading || getCommentIsError ? (
          <B.ErrorMessage>😥 {getCommentError?.message}</B.ErrorMessage>
        ) : (
          <D.DetailComment>
            <h4>
              댓글 <p>{getCommentData.length}</p>
            </h4>

            <D.WriteComment>
              <D.CommentTextArea ref={ref}/>
              <D.CommentSubmitButton onClick={addComment}>
                등 록
              </D.CommentSubmitButton>
            </D.WriteComment>

            {getCommentData.map((list, key) => (
              <>
                <CommentItem list={list} key={key} />
              </>
            ))}
          </D.DetailComment>
        )}
      </D.DetailWrapper>
    </Container>
  );
};

export default Detail;
