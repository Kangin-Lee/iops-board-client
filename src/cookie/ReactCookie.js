import { useState } from "react";
import { Cookies } from "react-cookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-08
 * 용도 : 로그인 관련 쿠키 모음
 * </pre>
 * 
 * react-cookie의 expires, maxAge 차이점
 * expires는 절대시간(ex. new Date()), maxAge는 초 단위로 상대시간(ex. 3600)
 */

const cookies = new Cookies();

// 쿠키 설정----------------------------------------------
export const setCookie = (name, value, maxAgeInSeconds) => {
  return cookies.set(name, value, maxAgeInSeconds);
};

//쿠키 값 읽어오기-----------------------------------------
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키 값 삭제하기----------------------------------------
export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};


