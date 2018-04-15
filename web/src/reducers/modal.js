import createReducer from './utils/createReducer';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

const modal = createReducer('modal', {
  [OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    type: action.modalType,
    props: action.props,
  }),
  [CLOSE_MODAL]: (state, action) => ({
    ...state,
    isOpen: false,
    type: null,
    props: null,
  }),
});

export default modal;
