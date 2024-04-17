import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import {
  getCookie,
  removeCookie,
} from "../cookie/ReactCookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 네비게이션바 컴포넌트
 * </pre>
 */

const Navbar = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLoginPage = () => {
    navigate("/login");
  };
  const goToLogoutPage = () => {
    showSuccessAlert("로그아웃 되었습니다.");
    removeCookie("userLoginInfo");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // getCookie('userLoginInfo');
  const userData = getCookie("userLoginInfo");
  useEffect(() => {
    if (userData === undefined) {
      setLoggedInUserEmail("비회원");
    } else {
      const userName = userData?.split("@")[0];
      setLoggedInUserEmail(userName);
    }
  }, []);



  return (
    <N.NavWrapper>
      <Link to="/">
        <img src="/images/iops-logo.png" />
      </Link>

      <N.UserInfo>
        <p>
          {userData === undefined
            ? "로그인 이후 이용 가능합니다."
            : `${loggedInUserEmail}님 반갑습니다.`}
        </p>

        {userData === undefined ? (
          <button onClick={goToLoginPage}>
            <HiOutlineLogin />
            로그인
          </button>
        ) : (
          <>
            <button onClick={goToLogoutPage}>
              <HiOutlineLogout />
              로그아웃
            </button>
          </>
        )}
      </N.UserInfo>
    </N.NavWrapper>
  );
};

export default Navbar;
