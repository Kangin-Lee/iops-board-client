//state 초기 값 세팅
let initalState = {
    isLogin:false, //로그인 상태
    posts:[], 
    currentPage: 1, //페이지네이션 현재 페이지
    totalPages: 0, // 페이지네이션 총 페이지 수
    handleUpdateComment:"", // 수정 댓글 상태 정보
    commentsData:[],
    postComments:[],
}

function reducer (state=initalState, action){
    if(action.type === "LOGIN"){
        return{...state, isLogin:true}
    }else if(action.type === "LOGOUT"){
        return{...state, isLogin:false}
    }else if(action.type === "ADD_POST"){
        return{...state, posts:[...state.posts, ]}
    }else if(action.type === "SET_CURRENT_PAGE"){
        return{...state, currentPage:action.payload}
    }else if(action.type === "SET_TOTAL_PAGES"){
        return{...state, totalPages:action.payload}
    }else if(action.type === "SET_HANDLE_UPDATE_COMMENT"){
        return{...state, handleUpdateComment:action.payload}
    }else if(action.type === "SET_COMMENTS_DATA"){
        return{...state, commentsData:action.payload}
    }else if(action.type === "SET_POST_COMMENTS"){
        return{...state, postComments:action.payload}
    }

    return {...state};
}

export default reducer;

