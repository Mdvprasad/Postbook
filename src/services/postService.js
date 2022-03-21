import http from "../http-common";
const userPrefix = '/users/2750';
const getAll = () => {
  return http.get(`${userPrefix}/posts`);
};
const get = id => {
  return http.get(`/posts/${id}`);
};
const create = data => {
  return http.post(`${userPrefix}/posts`, data);
};
const update = (id, data) => {
  return http.put(`/posts/${id}`, data);
};
const remove = id => {
  return http.delete(`/posts/${id}`);
};
const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default PostService;