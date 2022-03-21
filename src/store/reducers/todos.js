import {
    CREATE_TODO,
    RETRIEVE_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
} from "../actions/todos";
const initialState = [];
function todoReducer(todos = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_TODO:
            return [...todos, payload];
        case RETRIEVE_TODOS:
            return payload;
        case UPDATE_TODO:
            return todos.map(todo => todo.id !== payload.id ? todo : payload);
        case DELETE_TODO:
            return todos.filter(({ id }) => id !== payload.id);
        default:
            return todos;
    }
};
export default todoReducer;