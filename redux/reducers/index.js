import {combineReducers} from "@reduxjs/toolkit";
import Posts from "./posts";
import users from "./users";

const reducers = combineReducers({
  Posts: Posts,
  users: users,
});

export {reducers};
