import {
    CREATE_COMMENT,
    RETRIEVE_COMMENTS,
    UPDATE_COMMENT,
    DELETE_COMMENT,
} from "../actions/comments";
const initialState = [];
function commentReducer(comments = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_COMMENT:
            return [...comments, payload];
        case RETRIEVE_COMMENTS:
            return payload;
        case UPDATE_COMMENT:
            return comments.map(comment => comment.id !== payload.id ? comment : payload);
        case DELETE_COMMENT:
            return comments.filter(({ id }) => id !== payload.id);
        default:
            return comments;
    }
};
export default commentReducer;