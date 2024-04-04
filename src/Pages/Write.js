import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import * as W from "../styled-components/WriteModalStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/action";
import {
  useBoardData,
  useCreatePost,
  useCreatePostMutaion,
} from "../API/apiService";
import { WriteSuccess, WriteSuccessAlert, showSuccessAlert } from "../Alert/SuccessAlert";
import { LoginErrorAlert, WriteContentsErrorAlert, WriteTitleErrorAlert, showFailAlert } from "../Alert/ErrorAlert";

const Write = () => {
  const [lgShow, setLgShow] = useState(false);
  const titleInputRef = useRef(null);
  const contentsTextAreaRef = useRef(null);

  const navigate = useNavigate();

  const handleClose = () => {
    showFailAlert("글이 저장되지 않았습니다.");
  
    setLgShow(false);
  };

  // 리액트 쿼리로 서버에서 게시판 리스트 받아오기----------------
  const { refetch } = useBoardData();
  // ----------------------------------------------------------
  const isLogin = useSelector((state) => state.isLogin); // 리덕스에서 로그인 상태 가져오기

  //리액트 쿼리로 서버에 게시글 저장하기--------------------------
  const { mutate } = useCreatePost();
  const onSubmit = async (event) => {
    event.preventDefault();

    // 필요한 모든 데이터를 객체에 담습니다.
    const postData = {
      title: titleInputRef.current.value,
      contents: contentsTextAreaRef.current.value,
      writer: localStorage.getItem("loggedInUserEmail"),
    };

    // mutate 함수를 호출할 때 postData 객체를 전달합니다.
    if (postData.title === "") {
      showFailAlert("내용을 입력해 주세요.");
    } else if (postData.contents === "") {
      showFailAlert("내용을 입력해 주세요.");
    } else {
      showSuccessAlert("글이 정상적으로 등록되었습니다.");
      mutate(postData); //useMutaion으로 요청 처리
      setLgShow(false);
      
    }
    refetch();
  };
  //---------------------------------------------------------
  
  return (
    <>
      <W.WriteButton
        onClick={() => {
          if (isLogin) {
            setLgShow(true);
          } else {
            showFailAlert("로그인한 유저만 이용 가능합니다.");
            navigate("/login");
          }
        }}
      >
        글 작성
      </W.WriteButton>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-modal-sizes-title-lg"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            <HiOutlinePencil /> 글 작성
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <W.WriteForm onSubmit={onSubmit}>
            <W.InputWrapper>
              <label>제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                autoFocus
                ref={titleInputRef}
              />
            </W.InputWrapper>
            <W.TextAreaWrapper>
              <label>내용</label>
              <textarea
                placeholder="내용을 입력하세요"
                ref={contentsTextAreaRef}
                // onKeyDown={createBoardItem}
              />
            </W.TextAreaWrapper>
            <hr />
            <Modal.Footer
              style={{ backgroundColor: "white", border: "none", padding: "0" }}
            >
              {/* ----------취소 버튼--------- */}
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>

              {/* ----------제출 버튼--------- */}
              <Button type="submit" variant="success">
                글 쓰기
              </Button>
            </Modal.Footer>
          </W.WriteForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Write;
