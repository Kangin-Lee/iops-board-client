import React, { useEffect, useState } from "react";
import * as N from "../styled-components/NavbarStyled";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import {
  getCookie,
  getCookieExpirationTime,
  removeCookie,
} from "../cookie/ReactCookie";
import { useCookies } from "react-cookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 네비게이션바 컴포넌트
 * </pre>
 */

const Navbar = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [cookies, setCookies] = useCookies(["userLoginInfo"]);
  const [remainingTime, setRemainingTime] = useState(3600);

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
      const email = userData?.email;
      const userName = email?.split("@")[0];
      const expirationTime = getCookieExpirationTime("userLoginInfo");
      console.log("zzzzzzz", expirationTime);
      setLoggedInUserEmail(userName);
    }
  }, []);

  useEffect(() => {
    // 쿠키가 생성된 시간을 가져옴
    const cookieCreationTime = cookies.userLoginInfo
      ? new Date(cookies.userLoginInfo.expires)
      : new Date();
    console.log("@@@@####",cookieCreationTime);
    // 쿠키 생성 시간에서 1시간 후의 시간을 계산
    const expirationTime = new Date(cookieCreationTime.getTime() + 3600 * 1000);
    console.log("expirationTime", expirationTime);

    //1초마다 남은 시간을 업데이트
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = expirationTime - currentTime;

      // 남은 시간이 음수이면 타이머 종료
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        showSuccessAlert("시간이 만료되어 자동 로그아웃됩니다.");
        return;
      }

      // 남은 시간을 초 단위로 설정
      setRemainingTime(Math.floor(timeDifference / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cookies.userLoginInfo]);

  // 초를 시:분:초 형태로 변환하는 함수
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "오류 발생!";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

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
            <p>자동 로그아웃: {formatTime(remainingTime)}</p>
          </>
        )}
      </N.UserInfo>
    </N.NavWrapper>
  );
};

export default Navbar;
