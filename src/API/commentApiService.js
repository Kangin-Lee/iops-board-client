import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";
import { apiService } from "../common/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setPostComments } from "../redux/action";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-12
 * 용도 : 댓글 관련 api 모음
 * </pre>
 */

//댓글 등록하기 Detail------------------------
export const usePostComment = () => {
  const dispatch = useDispatch();
  const postComment = ({ id, contents, email }) => {
    return apiService.post(`/board/${id}/comments`, { contents, email });
  };

  return useMutation({
    mutationKey: ["postComment"],
    mutationFn: postComment,

    onSuccess: (data) => {
      if (data.data === "success") {
        dispatch(setPostComments(data));
        console.log("성공@@@@@@@@@@@@@@@@");
      }

      console.log("data", data);
    },
    onError: () => {
      showFailAlert("댓글 등록 중 오류가 발생했습니다.");
    },
  });
};

// 댓글 api 불러오기 Detail------------------------------------------------
export const useGetComment = (id) => {
  const getComment = () => {
    return apiService.get(`/board/${id}/comments`);
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

  const commentUpdate = (commentData) => {
    const id = commentData.id;
    const contents = commentData.contents;
    return apiService.put(`/update/comment/${id}`, {contents})
  };

  return useMutation({
    mutationFn: commentUpdate,
    mutationKey:["updateComment"],
  })
}

// 댓글 삭제 기능 -----------------------------------------------
export const useCommentDelete = (id) => {
  const commentDelete = () => {
    return apiService.delete(`/comment/${id}`);
  };

  return useMutation({
    mutationFn: commentDelete,
    mutationKey: ["deleteComment"],
    onSuccess: () => {
      showSuccessAlert("댓글 삭제가 완료되었습니다.");
    },

    onError: (error) => {
      showFailAlert("댓글을 삭제하던 중 오류가 발생했습니다.", error);
    },
  });
};
