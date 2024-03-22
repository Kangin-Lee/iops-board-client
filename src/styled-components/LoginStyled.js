import styled from "styled-components";

export const LoginWapper = styled.div`
background-image: url("images/login-image.jpg");
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: "NanumSquare", sans-serif;
`;


export const LoginForm = styled.form`
background-color: white;
border-radius: 5px;
width: 650px;
height: 480px;
padding: 50px 80px;
box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
  rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
  rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

export const InputWapper = styled.div`
display: flex;
flex-direction: column;
`;

export const SingUpPage = styled.span`
display: flex;
justify-content: center;
font-size: 13px;
margin-top: 15px;
`;

export const LoginButton = styled.button.attrs({
type: "submit"
})`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
font-size: 20px;
font-weight: bold;
height: 40px;
border-radius: 3px;
margin-top: 20px;
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

export const InputBox = styled.input`
padding-left: 7px;
height: 40px;
font-size: 15px;
border-radius: 3px;
margin-top: 3px;
border: 3px solid lightgray;
color: black;
`;

export const Label = styled.label`
display: flex;
align-items: center;
`;

export const WarningMessage = styled.div`
  color: tomato;
  display: flex;
  align-items: center;
  justify-content: end;
  
  p{
    margin: 0;
    padding-left: 3px;
    font-weight: bold;
  }
`;

export const CopyRight = styled.div`
  margin: 0;
  text-align: end;
  font-weight: bold;
`;