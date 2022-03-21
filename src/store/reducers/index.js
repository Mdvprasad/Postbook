import { combineReducers } from "redux";
import posts from "./posts";
import todos from "./todos";
import comments from "./comments";
export default combineReducers({
    posts,
    todos,
    comments
});