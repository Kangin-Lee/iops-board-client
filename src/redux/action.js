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