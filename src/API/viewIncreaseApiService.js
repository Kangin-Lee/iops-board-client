import { useMutation } from "@tanstack/react-query";
import { apiService } from "../common/apiService";
import { getCookie } from "../cookie/ReactCookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-12
 * 용도 : 조회수 증가 api
 * </pre>
 */

//조회 수 증가 Detail-------------------------------------------
export const useIncreaseCount = (id) => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }

    const increaseCount = () => {
      return apiService.put(`/board/${id}`,{}, {
        headers
      });
    };
  
    return useMutation({
      mutationFn: increaseCount,
      onSuccess: () => {
        console.log("조회수 증가 성공@@");
      },
  
      onError: (error) => {
        console.log("조회수 증가 에러", error.response.status);
      },
    });
  };
  