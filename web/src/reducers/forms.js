import createReducer from './utils/createReducer';
import {
  SET_FORM_VALUE,
} from '../actions';

const forms = createReducer('forms', {
  [SET_FORM_VALUE]: (state, action) => ({
    ...state,
    items: {
      ...state.items,
      [action.formName]: {
        ...(state.items[action.formName] || {}),
        [action.property]: action.value,
      },
    },
  })
});

export default forms;
