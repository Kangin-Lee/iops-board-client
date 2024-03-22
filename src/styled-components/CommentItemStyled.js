import styled from "styled-components";

export const DetailCommentItem = styled.div`
  background-color: lightgray;
  padding: 10px;
  border-radius: 3px;
  margin: 10px 0;
`;

export const CommentAndReCommentButton = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 30px;
    height: 30px;
    padding-bottom: 5px;
    border-radius: 3px;
    color: white;
    background-color: #222f54;
    transition: 0.3s;
    &:hover {
      background-color: #31447a;
      transition: 0.3s;
      transform: translateY(2px);
    }
  }
`;

export const ReCommentArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ReCommentWrapper = styled.div`
  background-color: white;
  width: 95%;
  padding: 10px;
  border-radius: 3px;
  border: 3px solid lightgray;

  div {
    display: flex;
  }
  textarea {
    width: 100%;
    resize: none;
    height: 70px;
    padding: 10px;
    border: 3px solid #222f54;
    border-radius: 3px;
  }
  button {
    width: 70px;
    margin-left: 15px;
    transition: 0.3s;
    border: none;
    border-radius: 3px;
    background-color: #222f54;
    color: white;
    font-size: 1.4rem;

    &:hover {
      background-color: #31447a;
      transition: 0.3s;
      transform: translateY(2px);
    }
  }
`;