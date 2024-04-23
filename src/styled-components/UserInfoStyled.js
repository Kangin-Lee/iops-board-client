import styled from "styled-components";

export const UserInfoWrapper = styled.div`
  height: 87vh;
  display: flex;
  padding: 100px;
  background-color: #eeeeee;
  font-family: "Noto Sans KR", sans-serif;
  border-top: 3px solid lightgray;
`;

export const UserInfo = styled.div`
  width: 50vh;
  height: 100%;
  border-radius: 3px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const UserActivie = styled.div`
  width: 50vh;
  height: 40vh;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const UserContents = styled.div`
  width: 50vh;
  height: 29vh;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const UserImg = styled.img`
  height: 200px;
  width: 200px;
  border: 5px solid #282828;
  border-radius: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`;

export const UserInfoDiv = styled.div`
p{
    margin: 0;
    font-weight: bold;
    padding:5px 0;
}
` 
export const UserInfoArea = styled.div`
    margin:0 30px;
`

export const UserData = styled.div`
    width: 100%;
    border-bottom: 2px solid gray;
    margin-bottom: 30px;
`

export const UserActivieInfo = styled.div`
    margin-left: 20px;
    p{
        margin: 0;
        width: 70px;
    }
`
export const UserActivieArea = styled.div`
    display: flex;
`