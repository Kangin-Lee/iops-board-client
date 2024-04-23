import { Cookies } from "react-cookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-08
 * 용도 : 쿠키 set, get, remove 설정
 * </pre>
 * 
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