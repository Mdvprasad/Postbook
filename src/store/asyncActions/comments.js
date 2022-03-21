import {
    CREATE_COMMENT,
    RETRIEVE_COMMENTS,
    UPDATE_COMMENT,
    DELETE_COMMENT,
} from "../actions/comments";
import CommentService from "../../services/commentService";
export const createComment = (post, post_id, name, email, body) => async (dispatch) => {
    try {
        const res = await CommentService.create({ post, post_id, name, email, body });
        dispatch({
            type: CREATE_COMMENT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const retrieveComments = () => async (dispatch) => {
    try {
        const res = await CommentService.getAll();
        dispatch({
            type: RETRIEVE_COMMENTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
export const updateComment = (id, data) => async (dispatch) => {
    try {
        const res = await CommentService.update(id, data);
        dispatch({
            type: UPDATE_COMMENT,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const deleteComment = (id) => async (dispatch) => {
    try {
        await CommentService.remove(id);
        dispatch({
            type: DELETE_COMMENT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
