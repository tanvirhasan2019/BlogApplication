
import { FETCH_ALL , SINGLE_POST_LIKE, DELETE_COMMENT,  FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
      case 'START_LOADING':
        return { ...state, isLoading: true };
      case 'END_LOADING':
        return { ...state, isLoading: false };
      case FETCH_ALL:
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_BY_CREATOR:
        return { ...state, posts: action.payload.data };
      case FETCH_POST:
        return { ...state, post: action.payload.data };
      case LIKE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case SINGLE_POST_LIKE:
        return { ...state, post: action.payload.data };
      case COMMENT :
         return { ...state, post: action.payload.data }; 
      case CREATE:
        return { ...state, posts: [...state.posts, action.payload] };
      case UPDATE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
      case DELETE:
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
      case DELETE_COMMENT:
          var updatecomment = state.post.comment.filter((post) => post._id !== action.payload);
          const {createdAt , creator , likes ,  message, selectedFile, tags, title, _id} = state.post;
          const newPost = {createdAt , creator , likes ,  message, selectedFile, tags, title, _id , comment: updatecomment}
        
          return { ...state, post: newPost};
      default:
        return state;
    }
  };
  