/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-03-08
 * 용도 : redux 사용을 위한 action
 * </pre>
 */

export const addPost = (post) => ({
  type: "ADD_POST",
  payload: post,
});

export const setCurrentPage = (pageNumber) => ({
  type: "SET_CURRENT_PAGE",
  payload: pageNumber,
});

export const setTotalPages = (totalPages) => ({
  type: "SET_TOTAL_PAGES",
  payload: totalPages,
});

export const setHandleUpdateComment = (handleUpdateComment) => ({
  type:"SET_HANDLE_UPDATE_COMMENT",
  payload: handleUpdateComment,
});

export const setCommentsData = (commentsData) => ({
  type:"SET_COMMENTS_DATA",
  payload:commentsData,
})

export const setPostComments = (postComments) => ({
  type:"SET_POST_COMMENTS",
  payload:postComments,
})

export const setCommentNum = (commentNum) => ({
  type:"SET_COMMENT_NUM",
  payload:commentNum,
})
