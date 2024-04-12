import styled from "styled-components";

export const DetailWrapper = styled.div`
  
  /* background-color: #edebeb; */
  border: 3px solid #222f54;
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 10px;
  padding: 20px 30px;
  margin-top: 30px;
`;

export const DetailWriteTimeWrapper = styled.div`
  span {
    border: 1px solid black;
  }
  div {
    border: 1px solid black;
    width: 100%;
  }
  display: flex;
`;

export const DetailTitle = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 3px;
  span{
    border: 1px solid black;
    width: 80px;
    text-align: center;
    padding: 10px;
    background-color: #222f54;
    color: white;
  }
  div{
    width: 100%;
    border: 1px solid black;
    border-left: none;
    padding: 10px;
  }
  margin: 5px 0;
`
export const DetailContentsInfo = styled.div`

  padding: 0;
  display: flex;
  justify-content: space-between;
`;

export const Writer = styled.div`
  flex: 0 0 53%;
  display: flex;
  border-radius: 3px;
  border: 1px solid black;
  span{
    width: 80px;
    text-align: center;
    padding: 10px;
    background-color: #222f54;
    color: white;
  }
  div{
    width: 100%;
    border: 1px solid black;
    border-left: none;
    padding: 10px;
  }
`

export const WriteTime = styled.div`
  flex: 0 0 35%;
  display: flex;
  border-radius: 3px;
  border: 1px solid black;
  span{
    width: 80px;
    text-align: center;
    padding: 10px;
    background-color: #222f54;
    color: white;
  }
  div{
    width: 100%;
    border: 1px solid black;
    border-left: none;
    padding: 10px;
  }
`

export const ViewCount = styled.div`
  flex: 0 0 10%;
  display: flex;
  border-radius: 3px;
  border: 2px solid black;
  span{
    text-align: center;
    padding: 10px;
    background-color: #222f54;
    color: white;
  }
  div{
    border-left: none;
    padding: 10px;
  }
`

export const DetailContents = styled.div`
  height: 300px;
  background-color: white;
  border: 3px solid #222f54;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
  overflow-wrap: break-word;
`;

export const DetailComment = styled.div`
  h4 {
    margin: 0;
    padding: 0;
    display: flex;
    p {
      color: tomato;
      margin-left: 7px;
    }
    margin-top: 15px;
  }
`;


export const WriteComment = styled.form`
  display: flex;
`;

export const CommentTextArea = styled.textarea.attrs({
  placeholder:"댓글을 입력해 주세요...",
  autoFocus:true,
})`
  width: 100%;
  resize: none;
  height: 100px;
  padding: 10px;
  border-radius: 3px;
  border: 3px solid #222f54;
`;

export const CommentSubmitButton = styled.button.attrs({
  type:"submit",
})`
  width: 100px;
  height: 100px;
  margin-left: 15px;
  border-radius: 3px;
  background-color: #222f54;
  color: white;
  transition: 0.3s;
  border: none;

  &:hover {
    background-color: #31447a;
    transition: 0.3s;
    transform: translateY(2px);
  }
`;

export const UpdateAndDeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`

export const UpdateButton = styled.button`
  margin-right: 10px;
  border-radius: 3px;
  background-color: lightblue;
  padding: 5px 10px;
  transition: 0.3s;
  border: 2px solid #31447a;
  font-weight: bold;
  &:hover {
    background-color: #c5e0e9;
    transition: 0.3s;
    transform: translateY(2px);
  }
`

export const DeleteButton = styled.button`
  border-radius: 3px;
  background-color: lightcoral;
  padding: 5px 10px;
  border: 2px solid #31447a;
  transition: 0.3s;
  font-weight: bold;
  &:hover {
    background-color: #f7a2a2;
    transition: 0.3s;
    transform: translateY(2px);
  }
`
