import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";
import { setCookie } from "../cookie/ReactCookie";
import { apiService } from "../common/apiService";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-03
 * 용도 : 로그인 API
 * </pre>
 */

//로그인 요청 Login---------------------------------------
export const useLoginData = () => {
  const navigate = useNavigate();
  const loginData = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    return apiService.post("/login", formData);
  };

  return useMutation({
    mutationFn: loginData,

    onSuccess: (response, loginInfo) => {
      const receivedToken = response.headers.authorization;
      const decodedToken = jwtDecode(receivedToken); //JWT 토큰을 디코딩하여 페이로드를 추출한다.

      const expirationTime = decodedToken.exp; // 추출한 페이로드에서 만료 시간을 확인한다.
      const expirationTimeInMillis = expirationTime * 1000; // 만료시간을 ms로 변환

      // 만료 시간을 Date 객체로 변환합니다.
      const expirationDate = new Date(expirationTimeInMillis);

      console.log("JWT 토큰의 만료 시간:", expirationDate);
      setCookie("expiresTime",expirationDate); // 만료시간 쿠키에 저장

      setCookie("jwt_token", receivedToken, { maxAge: 3600 }); //토큰 값 쿠키에 저장
      setCookie("userInfo", loginInfo.username, { maxAge: 3600 });

      console.log(response.headers);
      showSuccessAlert("로그인이 완료되었습니다.");
      navigate("/");
    },

    onError: (error) => {
      showFailAlert("😟 유효하지 않은 회원입니다." + error);
      console.log(error);
    },
  });
};
