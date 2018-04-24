import createReducer from './utils/createReducer';
import {
  STORE_COMMENT,
  STORE_COMMENTS,
} from '../actions';

const storeComments = (state, comments) => ({
  ...state,
  items: {
    ...state.items,
    ...comments.reduce((acc, comment) => {
      if (comment._delete) {
        acc[comment.id] = null;
        return acc;
      }

      acc[comment.id] = {
        ...(state.items[comment.id] || {}),
        ...comment,
      };

      return acc;
    }, {}),
  },
});

const comments = createReducer('comments', {
  [STORE_COMMENT]: (state, action) =>
    storeComments(state, [action.comment]),
  [STORE_COMMENTS]: (state, action) =>
    storeComments(state, action.comments),
});

export default comments;
