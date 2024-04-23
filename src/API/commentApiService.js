import { useMutation, useQuery } from "@tanstack/react-query";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";
import { apiService } from "../common/apiService";
import { getCookie } from "../cookie/ReactCookie";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-12
 * 용도 : 댓글 관련 api 모음
 * </pre>
 */

//댓글 등록하기 Detail------------------------
export const usePostComment = () => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }

  const postComment = ({ id, contents, email }) => {
    return apiService.post(`/board/${id}/comments`, { contents, email }, {headers});
  };

  return useMutation({
    mutationFn: postComment,

    onError: () => {
      showFailAlert("댓글 등록 중 오류가 발생했습니다.");
    },
  });
};

// 댓글 api 불러오기 Detail------------------------------------------------
export const useGetComment = (id) => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }
  const getComment = () => {
    return apiService.get(`/board/${id}/comments`,{headers});
  };

  return useQuery({
    queryKey: ["getComment"],
    queryFn: getComment,
    select: (data) => data.data,
    retry: 1,
    enabled: true,
  });
};

//댓글 수정 기능-----------------------------------------------
export const useCommentUpdate = () => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }
  const commentUpdate = (commentData) => {
    const id = commentData.id;
    const contents = commentData.contents;
    return apiService.put(`/update/comment/${id}`, {contents}, {headers})
  };

  return useMutation({
    mutationFn: commentUpdate,
  })
}

// 댓글 삭제 기능 -----------------------------------------------
export const useCommentDelete = (id) => {
  const headers = {
    AUTHORIZATION: getCookie("jwt_token"),
  }

  const commentDelete = () => {
    return apiService.delete(`/comment/${id}`, {headers});
  };

  return useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      showSuccessAlert("댓글 삭제가 완료되었습니다.");
    },

    onError: (error) => {
      if(error.response.status === 403){
        showFailAlert("댓글을 삭제할 권한이 없습니다.");
      }else{
        showFailAlert("댓글을 삭제하던 중 오류가 발생했습니다.", error);
      }
      
    },
  });
};
