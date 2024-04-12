import { apiService } from "./apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../Alert/SuccessAlert";
import { showFailAlert } from "../Alert/ErrorAlert";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-12
 * 용도 : 게시판의 게시물 관련 CRUD 모음
 * </pre>
 */

//게시글 생성 post 요청 Write------------------------------------------
export const useCreatePost = () => {
  const createPost = (postData) => {
    return apiService.post("/create", postData);
  };

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    enabled: false,
    onSuccess: () => {
      console.log("성공");
    },

    onError: () => {
      showFailAlert("글 작성 중 에러가 발생하였습니다.");
    },
  });
};

// 게시판 리스트 api 받아오기 BoardList--------------------
export const useBoardData = () => {
  const currentPage = useSelector((state) => state.currentPage);

  const fetchData = () => {
    return apiService.get(`/board?page=${currentPage}&size=10`);
  };

  return useQuery({
    queryKey: ["gets"],
    queryFn: fetchData,
    retry: 2,
    select: (data) => data.data,
    refetchOnWindowFocus: true,
  });
};

//수정 버튼을 눌렀을 때 수정할 글 api 가져오기 Update---------------
export const useGetUpdateBoard = (id) => {
  const getUpdateBoard = () => {
    return apiService.get(`/board/${id}`);
  };

  return useQuery({
    queryKey: ["getDetailCotents"],
    queryFn: getUpdateBoard,
    retry: 2,
    select: (data) => data.data,
  });
};

// 게시글 수정-----------------------------------------------------------
export const usePutUpdateContents = (id) => {
  const navigate = useNavigate();
  const putUpdateContents = ({ title, contents }) => {
    return apiService.put(`/update/${id}`, { title, contents });
  };

  return useMutation({
    mutationFn: putUpdateContents,
    mutationKey: ["updateContents"],
    onSuccess: () => {
      console.log();
      showSuccessAlert("수정이 완료되었습니다.");
      navigate(`/board/${id}`);
    },

    onError: (title, contents, error) => {
      if (title === "") {
        showFailAlert("제목을 입력해 주세요.");
      } else if (contents === "") {
        showFailAlert("내용을 입력해 주세요.");
      } else {
        showFailAlert("수정 중 오류가 발생했습니다. " + error);
      }
    },
  });
};

//게시글 삭제 delete 요청 Detail---------------------------------------
export const useDeletePost = () => {
    const navigate = useNavigate();
  
    const deletePost = (id) => {
      return apiService.delete(`/delete/${id}`);
    };
  
    return useMutation({
      mutationFn: deletePost,
      mutationKey: ["deletePost"],
      onSuccess: () => {
        showSuccessAlert("정상적으로 삭제 되었습니다.");
        navigate("/");
      },
  
      onError: () => {
        showFailAlert("삭제를 진행하던 중 오류가 발생하였습니다.");
      },
    });
  };