import axios from 'axios';

const API = axios.create({ baseURL: 'https://blog-web-apps-server-side.herokuapp.com' });



API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (searchQuery, page) => API.get(`/posts/search?page=${page}&searchQuery=${searchQuery}`);
export const FetchRecommendPost = (tags, id) => API.post(`/posts/${id}/recommended`, tags);

export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const likePosts = (id) => API.patch(`/posts/${id}/likePosts`);
export const comment = (id, message) => API.post(`/posts/${id}/commentPost`, { message });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const deleteComment = (id) => API.delete(`/posts/${id}/comment`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, user) => API.patch(`/user/update/${id}`, user);
