import styled from "styled-components";

export const WriteButton = styled.button`
  padding: 10px 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  background-color: #222f54;
  color: white;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    background-color: #31447a;
    transition: 0.3s;
    transform: translateY(2px);
  }
`;

export const WriteForm = styled.form`
  font-family: "Noto Sans KR", sans-serif;

  div {
    background-color: #222f54;
    display: flex;

    border: 3px solid black;
    border-radius: 5px;
  }

  label {
    padding-left: 13px;
    font-weight: bold;
    color: white;
  }
  input {
    width: 100%;
    padding-left: 10px;
    border: none;
    border-left: 3px solid black;
    outline: none;
  }
  textarea {
    width: 100%;
    height: 500px;
    resize: none;
    border: none;
    border-left: 3px solid black;
    padding: 10px 0 0 10px;
    outline: none;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TextAreaWrapper = styled.div`
  align-items: center;
`;
