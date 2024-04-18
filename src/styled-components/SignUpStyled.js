import styled from "styled-components";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : Signup Styled-Component
 * </pre>
 */

export const SignUpWapper = styled.div`
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

export const SignUpForm = styled.form`
  background-color: white;
  border-radius: 5px;
  width: 650px;
  height: 745px;
  padding: 50px 80px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;

  h1 {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const InputWapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
    font-size: 20px;
    padding-top: 3px;
  }
`;

export const InputBox = styled.input`
  padding-left: 7px;
  height: 40px;
  font-size: 15px;
  border-radius: 3px;
  margin-top: 3px;
  border: 3px solid lightgray;
  &[type="password"] {
    font-family: "noto-sans";
  }
`;

export const SignUpButton = styled.button.attrs({
  type: "submit",
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
`

export const CopyRight = styled.div`
  margin: 0;
  text-align: end;
  font-weight: bold;
`;