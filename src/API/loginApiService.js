import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";
import { setCookie } from "../cookie/ReactCookie";
import { apiService } from "./apiService";
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
    const login = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
  
    const loginData = (data) => {
      return apiService.post("/login", data);
    };
  
    return useMutation({
      mutationKey: ["login"],
      mutationFn: loginData,
  
      onSuccess: (data, email) => {
        setCookie("userLoginInfo", email, {maxAge:3600}); //쿠키 설정
        showSuccessAlert("로그인이 완료되었습니다.");
        navigate("/");
        dispatch({ type: "LOGIN" });
      },
  
      onError: (error) => {
        showFailAlert("😟 유효하지 않은 회원입니다." + error);
      },
    });
  };