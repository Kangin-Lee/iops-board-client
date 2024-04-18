import styled from "styled-components";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : CommentItem Styled-Component
 * </pre>
 */

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
    border: none;
    transition: 0.3s;
    &:hover {
      
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

export const EmailAndTime = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      margin: 0;
      color: gray;
      margin-bottom: 10px;
    }
`

export const CommentUpdateButton = styled.button`
  background-color: green;
  margin-right: 10px;

  &:hover{
    background-color: #429b42;
  }
`;

export const CommentDeleteButton = styled.button`
  background-color: #dc3545;

  &:hover{
    background-color: #e14f5d;
  }
`

export const ReCommentButton = styled.button`
background-color: #222f54;
&:hover{
  background-color: #31447a;
}
`

export const UpdateCommentInput = styled.input`
  height: 30px;
  width: 70%;

  outline: none;
  border: 2px solid #222f54;
  border-radius: 3px;
  font-size: 0.9rem;
  padding-left: 5px;

  /* margin: 0 10px; */
`

export const UpdateSubmitButton = styled.button`
    background-color: green;
  margin-right: 10px;

  &:hover{
    background-color: #429b42;
  }
`