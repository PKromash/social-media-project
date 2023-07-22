export const getPosts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/post");
    const data = await response.json();
    dispatch({type: "FETCH_ALL", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();
    dispatch({type: "FETCH", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const newPost = (post) => async (dispatch) => {
  try {
    const response = await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const data = await response.json();
    dispatch({type: "CREATE", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const data = await response.json();
    dispatch({type: "UPDATE", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    dispatch({type: "DELETE", payload: id});
  } catch (error) {
    console.log(error);
  }
};

export const newComment = (creator, message, id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comment/${id}/${creator}/${message}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const data = await response.json();
    dispatch({type: "CREATE_COMMENT", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    await fetch(`/api/comment/${id}/${commentId}`, {
      method: "DELETE",
    });

    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();

    dispatch({type: "DELETE_COMMENT", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/post/${id}/likePost/${userId}`, {
      method: "PATCH",
      contentType: "application/json",
    });
    const data = await response.json();
    dispatch({type: "LIKE", payload: data});
  } catch (error) {
    console.log(error);
  }
};
