import { START_LOADING, SINGLE_POST_LIKE, UPDATE, DELETE_COMMENT,END_LOADING, FETCH_ALL , CREATE , LIKE , COMMENT , DELETE, FETCH_POST } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createPost = (post, history) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


  export const updatePost = (post, id) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  

  export const getPosts = (searchQuery , page) => async (dispatch) => {
    try {

      dispatch({ type: START_LOADING });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(searchQuery , page);  
      dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING });

    } catch (error) {
      console.log(error);
    }
  };


  export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const {data}  = await api.fetchPost(id);
      dispatch({ type: FETCH_POST, payload:  {data} });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };


  export const Single_Postlike = (id) => async (dispatch) => {  
    try {
      const { data } = await api.likePost(id);
      dispatch({ type: SINGLE_POST_LIKE, payload: {data}} );
    } catch (error) {
      console.log(error);
    }
  };


  
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (message, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(id, message);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const response = await api.deleteComment(id);
    dispatch({ type: DELETE_COMMENT, payload: id });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};




  