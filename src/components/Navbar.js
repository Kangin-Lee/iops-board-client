import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import {
  HiOutlineSearch,
  HiOutlineLogout,
  HiOutlineLogin,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLogin, setIsLogin }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToLogoutPage = () => {
    alert("로그아웃 되었습니다.");
    setIsLogin(false);
    localStorage.removeItem("loggedInUserEmail")
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     console.log("로그인 되어 있어서 이름 바꿔줄거임");
  //   }
  // }, [isLogin]);

  // useEffect(()=>{
  //   axios.get("http://localhost:8080/user-info")
  //   .then((response)=>{
  //     const userInfo = response.data;
  //     console.log(userInfo);
  //     setUserInfo(userInfo);
  //   })
  // },[])
  // const handleSearchInputChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const searchSubmit = (e) => {
    e.preventDefault();
    // 여기서 검색을 수행하고 결과를 설정합니다.
    // const results = performSearch(searchTerm); // performSearch 함수는 검색을 수행하는 함수입니다.
    // setSearchResults(results);
  };

  useEffect(()=>{
    if(isLogin){
      const email = localStorage.getItem("loggedInUserEmail");
      const userName = email.split("@")[0];
      setLoggedInUserEmail(userName);
    }
  },[])

  return (
    <N.NavWrapper>
      <img src="images/iops-logo.png" />
      <N.SearchInput onSubmit={searchSubmit}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchTerm}
          // onChange={handleSearchInputChange}
        />
        <button type="submit">
          <HiOutlineSearch />
        </button>
      </N.SearchInput>
      <N.UserInfo>
        <p>
          {isLogin ? `${loggedInUserEmail}님 반갑습니다.` : "로그인 이후 이용 가능합니다."}
        </p>

        {isLogin ? (
          <button onClick={goToLogoutPage}>
            <HiOutlineLogout />
            로그아웃
          </button>
        ) : (
          <button onClick={goToLoginPage}>
            <HiOutlineLogin />
            로그인
          </button>
        )}
      </N.UserInfo>
    </N.NavWrapper>
  );
};

export default Navbar;
