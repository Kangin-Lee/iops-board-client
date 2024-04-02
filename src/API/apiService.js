import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//기본 경로 설정---------------------------------
const BASE_URL = "http://localhost:8080";

const apiService = axios.create({
  baseURL: BASE_URL,
});
// --------------------------------------------

//로그인 요청 Login---------------------------------------
// export const useLoginData = () => {
//   const loginData = () => {
//     return apiService.post("/login", {data});
//   }

//   return useQuery({
//     queryKey:['loginData'],
//     queryFn:loginData,
//     retry:1,
//     select:(data) => data.data,
//   })
// }

// 게시판 리스트 api 받아오기 BoardList--------------------
export const useBoardData = (currentPage) => {
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
//-------------------------------------------

//상세보기 리스트 api 받아오기 Detail -----------------
export const useDetailData = (id) => {
  const detailData = () => {
    return apiService.get(`/board/${id}`);
  };
  return useQuery({
    queryKey: ["get"],
    queryFn: detailData,
    retry: 2,
    select: (data) => data.data,
  });
};
//-------------------------------------------

//게시글 삭제 기능 Detail--------------------
// export const useDeleteContents = (id) => {
//   const deleteContents = () => {
//     return apiService.delete(`/delete/${id}`)
//   }

//   return useQuery({
//     queryKey:["delete",id],
//     queryFn:deleteContents,
//     retry:1,
//     select:(data) => data.data,
//     enabled:false,
//   })
// }

//댓글 서버에 저장하기------------------------
// export const usePostComment = (contents) => {
//     const postComment = () =>{
//         return apiService.post(`http://localhost:8080/board/${id}/comments`,
//         { contents, email })
//     }

//     return useQuery({
//         queryKey:["postComment"],
//         queryFn:postComment,
//         select: (response) = data.data,
//     })
// }

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
// -------------------------------------------------------------

// export const usePutUpdateContents = (id, title, contents) => {
//     const putUpdateContents = () => {
//         return apiService.put(`/update/${id}`, {title, contents})
//     }

//     return useQuery({
//         queryKey:["putUpdateContents"],
//         queryFn: putUpdateContents,
//         select:(data) => data.data,
//     })
// }

export const useGetComment = (id) => {
  const getComment = () => {
    return apiService.get(`/board/${id}/comments`);
  };

  return useQuery({
    queryKey: ["getComment"],
    queryFn: getComment,
    select: (data) => data.data,
    retry: 3,
  });
};

// 댓글 삭제 기능 -----------------------------------------------
// export const useCommentDelete = (id) => {
//   const commentDelete = () => {
//     return apiService.delete(`/comment/${id}`);
//   };

//   return useQuery({
//     queryKey: ["deleteComment"],
//     queryFn: commentDelete,
//     select: (data) => data.data,
//     retry: 1,
//     enabled:false
//   });
// };

export const useCommentDelete = (id) => {
  const commentDelete =()=>{
    return apiService.delete(`/comment/${id}`)
  };

  return useMutation({
    mutationFn:commentDelete,
    
  })
}
 
//게시글 생성 post 요청------------------------------------------
// export const useCreatePost = () => {
//  const createPost = () => {
//   return apiService.post('/create', {title, contents, writer})
//  } 

//  return useMutation ({
//   mutationFn:() => createPost
//  })
// }

// export const useCreatePostMutaion = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     async ({ title, contents, writer }) => {
//       const response = await apiService.post("/create", {
//         title,
//         contents,
//         writer,
//       });
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         alert("글이 정상적으로 작성되었습니다.");
//         queryClient.invalidateQueries();
//       },
//       onError: (error) => {
//         console.log("글 생성 에러 ", error);
//       },
//     }
//   );
//   return mutation;
// };


