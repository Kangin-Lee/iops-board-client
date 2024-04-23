import React, { useRef, useState } from "react";
import {
  PiTrashLight,
  PiPencilLine,
  PiCheck,
} from "react-icons/pi";
import * as C from "../styled-components/CommentItemStyled";
import {
  useCommentDelete,
  useCommentUpdate,
  useGetComment,
} from "../API/commentApiService";
import { useDispatch, useSelector } from "react-redux";
import { setHandleUpdateComment } from "../redux/action";
import { showFailAlert } from "../Alert/ErrorAlert";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { getCookie } from "../cookie/ReactCookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 댓글 컴포넌트
 * </pre>
 */

const CommentItem = ({ list }) => {
  const [updateComments, setUpdateComments] = useState(false);
  const [isUpdateSubmit, setIsUpdateSubmit] = useState(false);
  const inputRef = useRef(null);
  const handleUpdateComment = useSelector((state) => state.handleUpdateComment);
  const dispatch = useDispatch();

  const id = list.id;
  const userData = getCookie("userInfo");

  const updateComment = () => {
    setUpdateComments(!updateComments);
  };

  const { refetch: updateCommentsRefetch } =
    useGetComment(id);

  // 댓글 삭제---------------------------------------------------
  const { mutate: deleteCommentMutate } = useCommentDelete(id);
  const deleteComment = async () => {
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

  const { mutate } = useCommentUpdate();
  const updateSubmit = async () => {
    const contents = handleUpdateComment;
    const commentData = {
      id: id,
      contents: contents,
    };

    if (contents === "") {
      showFailAlert("댓글을 입력하세요.");
    } else {
      mutate(commentData, {
        onSuccess: (data) => {
          if (data.data === "수정") {
            showSuccessAlert("수정을 완료하였습니다.");
            setIsUpdateSubmit(true);
            setUpdateComments(!updateComments);
            updateCommentsRefetch();
          }
        },
        onError: (error) => {
          showFailAlert("댓글 수정 중 에러가 발생하였습니다. " + error);
        },
      });
    }
  };

  // --------------------------------------------------------------------
  const writeUpdateComment = (e) => {
    dispatch(setHandleUpdateComment(e.target.value));
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
          {((list.email === userData) || (userData === "admin@iops.co.kr")) ? (
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
            </div>
          ) : (
            ""
          )}
        </C.CommentAndReCommentButton>
      </C.DetailCommentItem>
    </>
  );
};

export default CommentItem;
