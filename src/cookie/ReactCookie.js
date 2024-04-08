import { Cookies } from "react-cookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-08
 * 용도 : 쿠키 모음
 * </pre>
 */

const cookies = new Cookies();

// 쿠키 설정----------------------------------------------
export const setCookie = (name, value) => {
  const expirationTime = new Date(Date.now() + 3600 * 1000); // 현재 시간에 1시간을 더한 시간
  return cookies.set(name, value, { expires: expirationTime });
};

//쿠키 값 읽어오기-----------------------------------------
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키 값 삭제하기----------------------------------------
export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};

// 쿠키 만료 시간 가져오기--------------------------------
// export const getCookieExpirationTime = (name) => {
//   const cookie = cookies.get(name);

//   console.log("ffffffff",(new Date(cookie?.expires)).toString());

//   if (cookie && (cookie?.expires || cookie.maxAge) ) {

//     // 만료 시간을 반환합니다.
//     console.log("쿠키 만료 시간:", Date(cookie?.expires));
//     return new Date(cookie.expires);
//   } else {
//     console.log("al;lad;lgk;ald", Date(cookie.expires).toString());
//     console.log("쿠키에 만료 시간이 없거나 쿠키가 존재하지 않습니다.");
//     return null; // 만료 시간이 없거나 쿠키가 존재하지 않을 경우 null을 반환합니다.
//   }
// };
export const getCookieExpirationTime = (name) => {
    const cookie = cookies.get(name);
    const expirationTime = ((Date.now() + 3600 * 1000)); // 현재 시간에 1시간을 더한 시간
  
    if (cookie) {
      // maxAge 속성을 사용하여 만료 시간을 가져옵니다.
      if (expirationTime) {
        // 만료 시간을 반환합니다.
        return new Date(expirationTime); // 현재 시간에 maxAge를 더하여 만료 시간을 계산합니다.
      } else {
        console.log("쿠키에 만료 시간이 없거나 쿠키가 존재하지 않습니다.");
        return null; // 만료 시간이 없거나 쿠키가 존재하지 않을 경우 null을 반환합니다.
      }
    } else {
      console.log("쿠키가 존재하지 않습니다.");
      return null; // 쿠키가 존재하지 않을 경우 null을 반환합니다.
    }
  };