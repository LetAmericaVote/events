import initialState from '../../store/initialState';

/**
 * Create a reducer function.
 *
 * @param  {String} key      Unique top-level store key
 * @param  {Object} handlers Object containing key:value relationships representing action_type:reducer_function.
 * @return {function}
 */
const createReducer = (key, handlers) => {
  return (state = initialState[key], action) => {
    const handler = handlers[action.type];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
};

export default createReducer;
