import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";
import { apiService } from "./apiService";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : 게시판 회원가입 API
 * </pre>
 */

export const useSignUpData = () => {
    const navigate = useNavigate();
    const signUpData = (data) => {
      return apiService.post("/signup", data);
    };
  
    return useMutation({
      mutationFn: signUpData,
      onSuccess: () => {
        showSuccessAlert("회원가입이 완료되었습니다.");
        navigate("/login");
      },
      onError: () => {
        showFailAlert("회원가입에 실패했습니다.");
      },
    });
  };
