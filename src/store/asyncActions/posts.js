import {
    CREATE_POST,
    RETRIEVE_POSTS,
    UPDATE_POST,
    DELETE_POST,
} from "../actions/posts";
import PostService from "../../services/postService";
export const createPost = (title, body) => async (dispatch) => {
    try {
        const res = await PostService.create({ title, body });
        dispatch({
            type: CREATE_POST,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const retrievePosts = () => async (dispatch) => {
    try {
        const res = await PostService.getAll();
        dispatch({
            type: RETRIEVE_POSTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
export const updatePost = (id, data) => async (dispatch) => {
    try {
        const res = await PostService.update(id, data);
        dispatch({
            type: UPDATE_POST,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const deletePost = (id) => async (dispatch) => {
    try {
        await PostService.remove(id);
        dispatch({
            type: DELETE_POST,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
