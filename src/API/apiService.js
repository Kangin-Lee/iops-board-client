import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPostComments } from "../redux/action";
import { LoginSuccessAlert, SignUpSuccessAlert, showSuccessAlert } from "../Alert/SuccessAlert";
import { LoginFailAlert, SignUpFailAlert, showFailAlert } from "../Alert/ErrorAlert";

//기본 경로 설정---------------------------------
const BASE_URL = "http://localhost:8080";

const apiService = axios.create({
  baseURL: BASE_URL,
});

// --------------------------------------------

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
      localStorage.setItem("loggedInUserEmail", email.email);
      showSuccessAlert("로그인이 완료되었습니다.");
      navigate("/");
      dispatch({ type: "LOGIN" });
    },

    onError: () => {
      showFailAlert("유효하지 않은 회원입니다.");
    },
  });
};
// ------------------------------------------------------

//회원가입 요청 SignUp------------------------------------
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

//댓글 등록하기 Detail------------------------
export const usePostComment = () => {
  const dispatch = useDispatch();
  const postComment = ({id,contents, email}) => {
    return apiService.post(`/board/${id}/comments`, {contents, email});
  }

  return useMutation({
    mutationKey:["postComment"],
    mutationFn: postComment,

    onSuccess: (data) => {
      dispatch(setPostComments(data));
    },
    onError: () => {
      showFailAlert("댓글 등록 중 오류가 발생했습니다.");
    }
  })
}


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


// 게시글 수정-----------------------------------------------------------
export const usePutUpdateContents = (id) => {
  const navigate = useNavigate();
  const putUpdateContents = ({title, contents}) => {
    return apiService.put(`/update/${id}`,{title, contents})
  }
  
  return useMutation({
    mutationFn: putUpdateContents,
    mutationKey: ['updateContents'],
    onSuccess:()=>{
      console.log();
      showSuccessAlert("수정이 완료되었습니다.");
      navigate(`/board/${id}`);
    },

    onError:(title, contents, error)=>{
      if(title === ""){
        showFailAlert("제목을 입력해 주세요.");
      }else if(contents === ""){
        showFailAlert("내용을 입력해 주세요.");
      }else{
        showFailAlert("수정 중 오류가 발생했습니다. " + error);
      }
    }
  })
}
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

// 댓글 삭제 기능 -----------------------------------------------
export const useCommentDelete = (id) => {
  const commentDelete = () => {
    return apiService.delete(`/comment/${id}`);
  };

  return useMutation({
    mutationFn: commentDelete,
    mutationKey:['deleteComment'],
    onSuccess:()=>{
      showSuccessAlert("댓글 삭제가 완료되었습니다.")
    },

    onError:(error)=>{
      showFailAlert("댓글을 삭제하던 중 오류가 발생했습니다.", error);
    }
  });
};

//게시글 생성 post 요청 Write------------------------------------------
export const useCreatePost = () => {
  const createPost = (postData) => {
    return apiService.post('/create', postData)
  }

  return useMutation({
    mutationKey:["createPost"],
    mutationFn:createPost,
    enabled: false,
    onSuccess: () => {
      console.log("성공");
    },

    onError: () => {
      showFailAlert("글 작성 중 에러가 발생하였습니다.");
    }
  })
}

//게시글 삭제 delete 요청 Detail---------------------------------------
export const useDeletePost = () => {
  const navigate = useNavigate();

  const deletePost = (id) => {
    return apiService.delete(`/delete/${id}`)
  }

  return useMutation({
    mutationFn: deletePost,
    mutationKey:["deletePost"],
    onSuccess:()=>{
      showSuccessAlert("정상적으로 삭제 되었습니다.")
      navigate('/');
    },

    onError:()=>{
      showFailAlert("삭제를 진행하던 중 오류가 발생하였습니다.");
    }
  })
}

//조회 수 증가 Detail-------------------------------------------
export const useIncreaseCount = (id) =>{
  const increaseCount = () => {
    return apiService.put(`/board/${id}`);
  }

  return useMutation({
    mutationFn:increaseCount,
    mutationKey:["increaseCount"],
    onSuccess:()=>{
      console.log("조회수 증가 성공@@")
    },

    onError:(error)=>{
      console.log("조회수 증가 에러", error);
    }
  })
}
