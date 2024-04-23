import React, { useEffect, useState } from "react";
import { getCookie, removeCookie } from "../cookie/ReactCookie";
import { showFailAlert } from "../Alert/ErrorAlert";
import { showWarningAlert } from "../Alert/WarningAlert";
import { useNavigate } from "react-router-dom";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-23
 * 용도 : 자동 로그아웃 타이머 안내를 위한 컴포넌트
 * </pre>
 */

const AutoLogout = () => {
  const expiresTime = new Date(getCookie("expiresTime"));
  const [expires, setExpires] = useState(""); // xx분 xx초 저장
  const [time, setTime] = useState(300); // 남은 시간 초 단위로 저장
  const navigate = useNavigate();

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
    <div>
      {/* 5분 미만이면 빨간색, 그렇지 않으면 일반색 */}
      <p style={{ color: time < 300 ? "#fe2627" : "inherit" }}>
        자동 로그아웃: {expires ? expires : "로딩 중..."}
      </p>
    </div>
  );
};

export default AutoLogout;
