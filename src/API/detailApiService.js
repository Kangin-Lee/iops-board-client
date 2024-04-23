import { useQuery } from "@tanstack/react-query";
import { apiService } from "../common/apiService";
import { getCookie } from "../cookie/ReactCookie";
/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-12
 * 용도 : 게시물 상세글 관련 API 
 * </pre>
 */

//상세보기 리스트 api 받아오기 Detail -----------------
export const useDetailData = (id) => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }
    const detailData = () => {
      return apiService.get(`/board/${id}`,{headers});
    };
    return useQuery({
      queryKey: ["get"],
      queryFn: detailData,
      retry: 2,
      select: (data) => data.data,
      enabled:true,
    });
  };