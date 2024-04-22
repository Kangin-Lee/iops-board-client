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
import { showFailAlert } from "../Alert/ErrorAlert";
import { showWarningAlert } from "../Alert/WarningAlert";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 네비게이션바 컴포넌트
 * </pre>
 */

const Navbar = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [expires, setExpires] = useState("");
  const [time, setTime] = useState(300);

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

  const expiresTime = new Date(getCookie("expiresTime"));

  // 토큰 만료시간 화면
  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentTime = new Date();
      const differnceTime = expiresTime - currentTime;
      const secondsDiffernce = Math.floor(differnceTime / 1000);
      setTime(secondsDiffernce);

      const minutes = Math.floor((secondsDiffernce % 3600) / 60);
      const remainingSeconds = secondsDiffernce % 60;

      // 시간을 두 자리로 포맷팅
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");

      //남은 시간이 0이면 화면 리렌더링 이후 쿠키 삭제
      if (minutes === 0 && remainingSeconds === 0) {
        showFailAlert(
          "시간이 만료되어 자동 로그아웃됩니다. 다시 로그인 해주세요."
        );
        navigate("/login");
        
        removeCookie("expiresTime");
        removeCookie("jwt_token");
        removeCookie("userInfo");

        return;
      }

      const formattedTime = `${formattedMinutes}분 ${formattedSeconds}초`;
      setExpires(formattedTime); // 출력: "59분 59초"
    };
    const intervalId = setInterval(calculateTimeDifference, 1000);
    return () => clearInterval(intervalId);
  }, [expiresTime]);

  if (time === 299) {
    showWarningAlert("5분 후에 자동으로 로그아웃됩니다.");
  }

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
            <p style={{ color: time < 300 ? "#fe2627" : "inherit" }}>
              자동 로그아웃:{" "}
              {expires?expires:"로딩 중..."}
            </p>
          </>
        )}
      </N.UserInfo>
    </N.NavWrapper>
  );
};

export default Navbar;
