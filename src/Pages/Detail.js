import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import * as D from "../styled-components/DetailStyled";
import CommentItem from "../components/CommentItem";
import { useNavigate, useParams } from "react-router-dom";
import * as B from "../styled-components/BoardListStyled";
import {
  useDetailData,
} from "../API/detailApiService";
import { showFailAlert } from "../Alert/ErrorAlert";
import { getCookie } from "../cookie/ReactCookie";
import { usePostComment,useGetComment } from "../API/commentApiService";
import {useIncreaseCount} from "../API/viewIncreaseApiService";
import { useDeletePost } from "../API/boardApiService";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 상세보기 페이지
 * </pre>
 */

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [handelComment, sethandelComment] = useState(""); // 댓글 내용

  const userData = getCookie("userInfo");

  //디테일 정보 불러오기------------------------------------------
  const { isLoading, data, isError, error } = useDetailData(id);
  //조회 수 증가-------------------------------------------------
  const {mutate} = useIncreaseCount(id);

  useEffect(()=>{
    mutate();
  },[])

  // 댓글 api 보내기--------------------------------------------
  const writeComment = (e) => {
    const writeComment = e.target.value;
    sethandelComment(writeComment)
  };

  // 댓글 등록 기능---------------------------------------------
  const addComment = async (e) => {
    e.preventDefault();

    const userData = getCookie("userInfo");
    if (userData === undefined) {
      showFailAlert("로그인한 유저만 이용 가능합니다.");
      navigate("/login");
    } else if (handelComment === "") {
      showFailAlert("댓글을 작성해 주세요.");
    } else {
      await postComment(handelComment);
      sethandelComment("");
    }
  };

  const {mutate:postCommentMutate} = usePostComment(); //리액트 쿼리로 댓글 등록하기

  const postComment = async (contents) => {
    const email = userData;
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
    if (userData) {
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
    if (userData) {
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

        {/* 수정, 삭제 버튼---------------------------------------------- */}
        {data?.email == userData ? (
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
              <D.CommentTextArea onChange={writeComment}/>
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