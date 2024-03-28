import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import {
  HiOutlineLogout,
  HiOutlineLogin,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ isLogin }) => {
  // const [userInfo, setUserInfo] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  const navigate = useNavigate();
  const goToLoginPage = () => {
    navigate("/login");
  };
  isLogin = !!localStorage.getItem("loggedInUserEmail");
  const goToLogoutPage = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("loggedInUserEmail")
    navigate("/login");
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
      <Link to="/"><img src="/images/iops-logo.png" /></Link>

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
