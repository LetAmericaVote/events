import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import SignupModal from './SignupModal';
import {
  selectIsSignupModalOpen,
  selectModalProps,
} from '../selectors';

const ModalBackground = styled.div`
  ${props => props.theme.reset}

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 10000;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.theme.smallPadding}
`;

const Modal = (props) => {
  const {
    isSignupModalOpen,
    modalProps,
  } = props;

  if (isSignupModalOpen) {
    return (
      <ModalBackground>
        <SignupModal {...modalProps} />
      </ModalBackground>
    );
  }

  return null;
}

Modal.mapStateToProps = (state, ownProps) => ({
  isSignupModalOpen: selectIsSignupModalOpen(state),
  modalProps: selectModalProps(state),
});

export default Rivet(Modal);
