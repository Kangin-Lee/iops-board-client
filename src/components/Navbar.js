import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import {
  HiOutlineLogout,
  HiOutlineLogin,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  // const [userInfo, setUserInfo] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const isLogin = useSelector(state => state.isLogin); // 리덕스에서 로그인 상태 가져오기

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLoginPage = () => {
    navigate("/login");
  };
  const goToLogoutPage = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("loggedInUserEmail")
    dispatch({type:"LOGOUT"});
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
