import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import { HiOutlineLogout, HiOutlineLogin, HiOutlineCog } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { getCookie, removeCookie } from "../cookie/ReactCookie";
import AutoLogout from "./AutoLogout";
import { Container } from "react-bootstrap";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 네비게이션바 컴포넌트
 * </pre>
 */

const Navbar = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToLoginPage = () => {
    navigate("/login");
  };
  const goToLogoutPage = () => {
    showSuccessAlert("로그아웃 되었습니다.");
    removeCookie("jwt_token");
    removeCookie("userInfo");
    removeCookie("expiresTime");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const userData = getCookie("userInfo");
  useEffect(() => {
    if (userData === undefined) {
      setLoggedInUserEmail("비회원");
    } else {
      const userName = userData.split("@")[0];
      setLoggedInUserEmail(userName);
    }
  }, []);

  //사용자 정보 및 세팅 화면
  const goToSetting = () => {
    navigate("/userinfo");
  };

  // 현재 경로를 가져온 후, /userinfo와 일치하는지 확인하여 아이콘을 숨깁니다.
  const hideIcon = location.pathname === "/userinfo";

  return (
    <Container>
      <N.NavWrapper>
        <Link to="/">
          <img src="/images/iops-logo.png" />
        </Link>

        <N.UserInfo>
          {hideIcon?"":<HiOutlineCog onClick={goToSetting} />}
          
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

              <AutoLogout />
            </>
          )}
        </N.UserInfo>
      </N.NavWrapper>
    </Container>
  );
};

export default Navbar;
