import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import * as W from "../styled-components/WriteModalStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = ({ isLogin }) => {
  const [lgShow, setLgShow] = useState(false);
  const titleInputRef = useRef(null);
  const contentsTextAreaRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    alert("글이 저장되지 않았습니다.");

    setLgShow(false);
  };

  isLogin = !!localStorage.getItem("loggedInUserEmail");

  const onSubmit = async(e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const contents = contentsTextAreaRef.current.value;
    const writer = localStorage.getItem("loggedInUserEmail");
    console.log("제출:", title,contents,writer);

    try{
      const response = await axios.post(`http://localhost:8080/create`, {title, contents, writer});
      const {data:responseData} = response;

      if(title ==="" || contents ===""){
        alert("제목 혹은 내용을 입력해 주세요.");
      }else{
        alert("글이 정상적으로 작성되었습니다.");
        setLgShow(false);
        window.location.reload();
      }
    }catch(error){
      console.log('글 생성 에러', error);
    }
  };

  return (
    <>
      <W.WriteButton
        onClick={() => {
          if(isLogin){
            setLgShow(true);
          }else{
            alert("로그인한 유저만 이용 가능합니다.")
            navigate("/login");
          }
          
          // {isLogin ? setLgShow(true) : (alert("로그인한 유저만 이용 가능합니다."), navigate("/login"))}
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
              <input type="text" placeholder="제목을 입력하세요." autoFocus ref={titleInputRef}/>
            </W.InputWrapper>
            <W.TextAreaWrapper>
              <label>내용</label>
              <textarea placeholder="내용을 입력하세요" ref={contentsTextAreaRef}/>
            </W.TextAreaWrapper>
            <hr/>
            <Modal.Footer style={{backgroundColor:"white", border:"none", padding:"0"}}>
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
