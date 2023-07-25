export const getPosts = () => async (dispatch) => {
  try {
    console.log("Fetching all posts...");
    const response = await fetch("/api/post");
    const data = await response.json();
    console.log("Fetched posts:", data);
    dispatch({type: "FETCH_ALL", payload: data});
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    console.log("Fetching a single post...");
    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();
    console.log("Fetched post:", data);
    dispatch({type: "FETCH", payload: data});
  } catch (error) {
    console.log("Error fetching post:", error);
  }
};

export const newPost = (post) => async (dispatch) => {
  try {
    console.log("Creating a new post...");
    const response = await fetch("/api/post/new", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const data = await response.json();
    console.log("Created post:", data);
    dispatch({type: "CREATE", payload: data});
  } catch (error) {
    console.log("Error creating post:", error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log("Updating a post...");
    const response = await fetch(`/api/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const data = await response.json();
    console.log("Updated post:", data);
    dispatch({type: "UPDATE", payload: data});
  } catch (error) {
    console.log("Error updating post:", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log("Deleting a post...");
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    console.log("Deleted post ID:", id);
    dispatch({type: "DELETE", payload: id});
  } catch (error) {
    console.log("Error deleting post:", error);
  }
};

export const newComment = (creator, message, id) => async (dispatch) => {
  try {
    console.log("Creating a new comment...");
    const response = await fetch(`/api/comment/${id}/${creator}/${message}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log("Created comment:", data);
    dispatch({type: "CREATE_COMMENT", payload: data});
  } catch (error) {
    console.log("Error creating comment:", error);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    console.log("Deleting a comment...");
    await fetch(`/api/comment/${id}/${commentId}`, {
      method: "DELETE",
    });

    console.log("Deleted comment ID:", commentId);

    const response = await fetch(`/api/post/${id}`);
    const data = await response.json();
    console.log("Updated post after deleting comment:", data);

    dispatch({type: "DELETE_COMMENT", payload: data});
  } catch (error) {
    console.log("Error deleting comment:", error);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    console.log("Liking a post...");
    const response = await fetch(`/api/post/${id}/likePost/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({}), // Since the request doesn't have a request body, you can pass an empty object here.
    });
    const data = await response.json();
    console.log("Updated post after liking:", data);
    dispatch({type: "LIKE", payload: data});
  } catch (error) {
    console.log("Error liking post:", error);
  }
};
