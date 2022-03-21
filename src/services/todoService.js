import http from "../http-common";
const userPrefix = '/users/2750';
const getAll = () => {
  return http.get(`${userPrefix}/todos`);
};
const get = id => {
  return http.get(`/todos/${id}`);
};
const create = data => {
  return http.post(`${userPrefix}/todos`, data);
};
const update = (id, data) => {
  return http.put(`/todos/${id}`, data);
};
const remove = id => {
  return http.delete(`/todos/${id}`);
};
const TodoService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default TodoService;