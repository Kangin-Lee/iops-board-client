import React, { useState } from "react";
import styled from "styled-components";
import {
  PiArrowUDownLeftBold,
  PiArrowUpBold,
  PiArrowElbowDownRightBold,
} from "react-icons/pi";
import * as C from "../styled-components/CommentItemStyled";

const CommentItem = ({handelComment}) => {
  const [isReCommentWrapper, setIsReCommentWrapper] = useState(false);
  const [reCommentContents, setReCommentContents] = useState("");

  const isReComment = () => {
    setIsReCommentWrapper(!isReCommentWrapper);
  };

  const handleChange = (e) => {
    setReCommentContents(e.target.value);
  };

  const uploadComment = (e) => {
    console.log(reCommentContents);
    if (reCommentContents === "") {
      alert("내용을 입력하세요.");
    } else {
      setIsReCommentWrapper(!isReCommentWrapper);
    }
  };
  return (
    <>
      <C.DetailCommentItem>
        <h6>홍길동</h6>
        <C.CommentAndReCommentButton>
          : {handelComment}
          <button onClick={isReComment}>
            <PiArrowUDownLeftBold />
          </button>
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
