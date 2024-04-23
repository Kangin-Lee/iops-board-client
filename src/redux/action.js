/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : redux 사용을 위한 action
 * </pre>
 */

//현재 페이지
export const setCurrentPage = (pageNumber) => ({
  type: "SET_CURRENT_PAGE",
  payload: pageNumber,
});

//총 페이지 수
export const setTotalPages = (totalPages) => ({
  type: "SET_TOTAL_PAGES",
  payload: totalPages,
});

//변경된 댓글 내용
export const setHandleUpdateComment = (handleUpdateComment) => ({
  type:"SET_HANDLE_UPDATE_COMMENT",
  payload: handleUpdateComment,
});
