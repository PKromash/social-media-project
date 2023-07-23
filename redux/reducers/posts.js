const reducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      console.log("Fetching all posts...");
      console.log("Action payload:", action.payload);
      return action.payload;
    case "FETCH":
      console.log("Fetching a single post...");
      console.log("Action payload:", action.payload);
      return action.payload;
    case "CREATE":
      console.log("Creating a new post...");
      console.log("Action payload:", action.payload);
      return [...posts, action.payload];
    case "UPDATE":
      console.log("Updating a post...");
      console.log("Action payload:", action.payload);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      console.log("Deleting a post...");
      console.log("Action payload:", action.payload);
      return posts.filter((post) => post._id !== action.payload);
    case "CREATE_COMMENT":
      console.log("Creating a new comment...");
      console.log("Action payload:", action.payload);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE_COMMENT":
      console.log("Deleting a comment...");
      console.log("Action payload:", action.payload);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "LIKE":
      console.log("Liking a post...");
      console.log("Action payload:", action.payload);
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};

export default reducer;
