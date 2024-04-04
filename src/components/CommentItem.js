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
import { useCommentDelete, useGetComment } from "../API/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setHandleUpdateComment } from "../redux/action";
import { showFailAlert } from "../Alert/ErrorAlert";
import { showSuccessAlert } from "../Alert/SuccessAlert";

const CommentItem = ({ list }) => {
  const [isReCommentWrapper, setIsReCommentWrapper] = useState(false); //대댓글 영역
  const [updateComments, setUpdateComments] = useState(false); 
  const [reCommentContents, setReCommentContents] = useState(""); //대댓글 내용
  const [commentContents, setCommentContents] = useState("");
  const [isUpdateSubmit, setIsUpdateSubmit] = useState(false);
  const inputRef = useRef(null);
  const handleUpdateComment = useSelector((state) => state.handleUpdateComment);
  const dispatch = useDispatch();

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

  const {refetch: updateCommentsRefetch, data: updateCommentsData} = useGetComment(id);

  // 댓글 삭제---------------------------------------------------
  const {mutate:deleteCommentMutate} = useCommentDelete(id); 
  const deleteComment = async () => {
    console.log("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
    deleteCommentMutate();
    updateCommentsRefetch();
  };

  // 댓글 수정 api 보내기------------------------------------------

  //엔터 키를 눌렀을 때 댓글 등록 되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSubmit();
    }
  };

  const updateSubmit = async (e) => {
    // const id = list.id;
    const contents = handleUpdateComment;
    if (contents === "") {
      showFailAlert("댓글을 입력하세요");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8080/update/comment/${id}`,
          { contents }
        );
        console.log(response.data);
        const responseData = response.data;
        if (responseData === "수정") {
          console.log("댓글 수정 완료");
          showSuccessAlert("수정을 완료하였습니다.");
          setIsUpdateSubmit(true);
          setUpdateComments(!updateComments);
          updateCommentsRefetch();
          console.log("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",updateCommentsData);
          // window.location.reload();
        }
      } catch (error) {
        console.log("수정 에러", error);
      }
    }
  };

  // --------------------------------------------------------------------
  const writeUpdateComment = (e) => {
    const aaa = dispatch(setHandleUpdateComment(e.target.value));
    console.log(aaa);
  };
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
