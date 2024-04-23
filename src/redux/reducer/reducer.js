/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : redux 사용을 위한 reducer
 * </pre>
 */

//state 초기 값 세팅
let initalState = {
  currentPage: 0, //페이지네이션 현재 페이지 초기값
  totalPages: 0, // 페이지네이션 총 페이지 수 초기값
  handleUpdateComment: "", // 수정 댓글 상태 정보 초기값
};

function reducer(state = initalState, action) {
  if (action.type === "SET_CURRENT_PAGE") {
    return { ...state, currentPage: action.payload };
  } else if (action.type === "SET_TOTAL_PAGES") {
    return { ...state, totalPages: action.payload };
  } else if (action.type === "SET_HANDLE_UPDATE_COMMENT") {
    return { ...state, handleUpdateComment: action.payload };
  }

  return { ...state };
}

export default reducer;
