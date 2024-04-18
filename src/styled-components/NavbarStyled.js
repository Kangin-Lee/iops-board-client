import styled from "styled-components";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : Navbar Styled-Component
 * </pre>
 */

export const NavWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  img {
    width: 150px;
  }
`;

export const SearchInput = styled.form`
  border: 3px solid lightgray;
  background-color: #efeeee;
  padding: 10px 15px;
  border-radius: 40px;
  input {
    border: none;
    background-color: transparent;
    width: 350px;
    outline: none;
  }
  button {
    background-color: transparent;
    border: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  p {
    margin: 0;
    font-weight: bold;
  }
  button {
    background-color: #222f54;
    margin-top: 10px;
    border: none;
    padding: 3px 5px;
    padding: 10px 15px;
    border-radius: 40px;
    color: white;
    transition: 0.3s;

    &:hover {
      background-color: #31447a;
      transition: 0.3s;
      transform: translateY(2px);
    }
  }
`;
