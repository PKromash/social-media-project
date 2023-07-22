export const newUser = (user) => async (dispatch) => {
  return dispatch({
    type: "NEW_USER",
    payload: user,
  });
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();
    dispatch({type: "ALL_USERS", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (user) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${user}`);
    const data = await response.json();
    dispatch({type: "FETCH_USER", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const follow = (userId, followId) => async (dispatch) => {
  try {
    await fetch(`/api/users/${userId}/${followId}`, {
      method: "PATCH",
      body: JSON.stringify({}),
    });
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch({type: "UPDATE_USER", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (user, id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch({type: "UPDATE_USER", payload: data});
  } catch (error) {
    console.log(error);
  }
};
