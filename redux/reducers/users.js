const reducer = (users = [], action) => {
  switch (action.type) {
    case "ALL_USERS":
      return action.payload;
    case "FETCH_USER":
      return action.payload;
    case "NEW_USER":
      return [...users, action.payload];
    case "UPDATE_USER":
      return users.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });
    default:
      return users;
  }
};

export default reducer;
