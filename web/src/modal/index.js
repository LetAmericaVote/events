import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import SignupModal from './SignupModal';
import CommentModal from './CommentModal';
import {
  closeModal,
  setPathname,
} from '../actions';
import {
  makeEventRoute,
  HOME_ROUTE,
} from '../routing/routes';
import {
  selectIsSignupModalOpen,
  selectIsCommentModalOpen,
  selectModalProps,
} from '../selectors';

const ModalBackground = styled.div`
  ${props => props.theme.reset}

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  z-index: 10000;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;

  ${props => props.theme.smallPadding}
`;

const Modal = (props) => {
  const {
    isSignupModalOpen,
    isCommentModalOpen,
    modalProps,
    setPathname,
    closeModal,
  } = props;

  if (isSignupModalOpen) {
    return (
      <ModalBackground>
        <SignupModal {...modalProps} />
      </ModalBackground>
    );
  }

  if (isCommentModalOpen) {
    const isEventComment = !!modalProps.eventSlug;

    const onClose = (event) => {
      if (event.target.id !== 'modal-close') {
        return;
      }

      if (isEventComment) {
        setPathname(makeEventRoute(modalProps.eventSlug));
      } else {
        setPathname(HOME_ROUTE);
      }

      closeModal();
    }

    return (
      <ModalBackground onClick={onClose} id="modal-close">
        <CommentModal {...modalProps} />
      </ModalBackground>
    );
  }

  return null;
}

Modal.mapStateToProps = (state, ownProps) => ({
  isSignupModalOpen: selectIsSignupModalOpen(state),
  isCommentModalOpen: selectIsCommentModalOpen(state),
  modalProps: selectModalProps(state),
});

Modal.actionCreators = {
  closeModal,
  setPathname,
};

export default Rivet(Modal);
