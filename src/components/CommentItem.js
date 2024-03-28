import React, { useRef, useState } from "react";
import {
  PiArrowUDownLeftBold,
  PiArrowUpBold,
  PiArrowElbowDownRightBold,
  PiTrashLight,
  PiPencilLine,
  PiCheck,
} from "react-icons/pi";
import * as C from "../styled-components/CommentItemStyled";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CommentItem = ({ list }) => {
  const [isReCommentWrapper, setIsReCommentWrapper] = useState(false);
  const [updateComments, setUpdateComments] = useState(false);
  const [reCommentContents, setReCommentContents] = useState("");
  const [commentContents, setCommentContents] = useState("");
  const [handleUpdateComment, setHandleUpdateComment] = useState("");
  const [isUpdateSubmit, setIsUpdateSubmit] = useState(false);
  const inputRef = useRef(null);

  const id = list.id;

  //대댓글 기능-----------------------------------
  // const isReComment = () => {
  //   setIsReCommentWrapper(!isReCommentWrapper);
  // };
  // -------------------------------------------

  const handleChange = (e) => {
    setReCommentContents(e.target.value);
  };

  const uploadComment = (e) => {
    console.log(reCommentContents);
    // inputRef.current.focus();
    if (reCommentContents === "") {
      alert("내용을 입력하세요.");
    } else {
      setIsReCommentWrapper(!isReCommentWrapper);
    }
  };

  const updateComment = () => {
    setUpdateComments(!updateComments);
  };

  const deleteComment = async () => {
    const id = list.id;
    console.log(list.id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/comment/${id}`
      );
      const responseData = response.data;
      // window.location.reload();
      if (responseData == "삭제") {
        
        window.location.reload();
      }
    } catch (error) {
      console.log("삭제 에러", error);
    }
  };

  // 댓글 수정 api 보내기------------------------------------------

  //엔터 키를 눌렀을 때 댓글 등록 되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSubmit();
    }
    console.log("aaaaaa",e.onKeyDown)
  };

  const updateSubmit = async (e) => {
    console.log("수정");
    // const id = list.id;
    const contents = handleUpdateComment;
    if (contents === "") {
      alert("댓글을 입력하세요");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8080/update/comment/${id}`,
          { contents }
        );
        const responseData = response.data;
        if (responseData === "수정") {
          console.log("댓글 수정 완료");
          alert("수정을 완료하였습니다.");
          // await axios.get(`http://localhost:8080/update/comment/${id}`)
          // .then((response) => {
          //   const commentData = response.data;
          //   console.log("데이터:", commentData);
          // })
          // .catch((error) => {
          //   console.error("Error fetching posts: ", error);
          // });
          // const updateData = await axios.get(`http://localhost:8080/board/${id}/comments`);
          // const updateResponseData = updateData.data;
          // console.log("aaaa",updateResponseData);
          setIsUpdateSubmit(true);
          setUpdateComments(!updateComments);
          window.location.reload();
        }
      } catch (error) {
        console.log("수정 에러", error);
      }
    }
  };

  // const contents = handleUpdateComment;
  // const{data, isError, error, refetch} = useQuery({
  //   queryKey:['put'],
  //   queryFn: () => {
  //     return axios.put(`http://localhost:8080/update/comment/${id}`, {contents})
  //   },
  //   select:(data) => {
  //     return data.data;
  //   },
  // })

  // --------------------------------------------------------------------
  const writeUpdateComment = (e) => {
    console.log(e.target.value);
    setHandleUpdateComment(e.target.value);
  };
  console.log("ddd", list);
  return (
    <>
      <C.DetailCommentItem>
        <C.EmailAndTime>
          <h6>{list.email.split("@")[0]}</h6>
          <p>{list.updateTime === null ? list.createTime : list.updateTime}</p>
        </C.EmailAndTime>

        <C.CommentAndReCommentButton>
          {!updateComments ? (
            `: ${list.contents}`
          ) : (
            <C.UpdateCommentInput
              type="text"
              placeholder="댓글을 입력해 주세요."
              onChange={writeUpdateComment}
              ref={inputRef}
              autoFocus
              onKeyUp={handleKeyDown}
            />
          )}
          {list.email === localStorage.getItem("loggedInUserEmail") ? (
            <div>
              {!updateComments ? (
                <C.CommentUpdateButton onClick={updateComment}>
                  <PiPencilLine />
                </C.CommentUpdateButton>
              ) : (
                <C.UpdateSubmitButton onClick={updateSubmit} type="submit">
                  <PiCheck />
                </C.UpdateSubmitButton>
              )}

              <C.CommentDeleteButton
                className="comment-delete"
                onClick={deleteComment}
              >
                <PiTrashLight />
              </C.CommentDeleteButton>
              {/* <C.ReCommentButton onClick={isReComment}>
                <PiArrowUDownLeftBold />
              </C.ReCommentButton> */}
            </div>
          ) : (
            // <C.ReCommentButton onClick={isReComment}>
            //   <PiArrowUDownLeftBold />
            // </C.ReCommentButton>
            ""
          )}
        </C.CommentAndReCommentButton>
        {reCommentContents ? (
          <div>
            <PiArrowElbowDownRightBold />
            {reCommentContents}
          </div>
        ) : (
          ""
        )}
      </C.DetailCommentItem>

      {isReCommentWrapper ? (
        <C.ReCommentArea>
          <PiArrowElbowDownRightBold
            style={{ fontSize: "2rem", marginLeft: "10px" }}
          />
          <C.ReCommentWrapper>
            <h6>댓글 남기기</h6>
            <div>
              <textarea
                placeholder="대댓글을 입력해 주세요..."
                onChange={handleChange}
              ></textarea>
              <button onClick={uploadComment}>
                <PiArrowUpBold />
              </button>
            </div>
          </C.ReCommentWrapper>
        </C.ReCommentArea>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentItem;
