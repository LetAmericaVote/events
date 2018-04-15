import React from 'react';
import Rivet from '../hoc/Rivet';
import BaseModal from './BaseModal';
import {
  openSignupModal,
  closeModal,
} from '../actions';

const TOTAL_STEPS = 2;

const SignupModal = (props) => {
  const {
    eventId,
    stepIndex,
    openSignupModal,
    closeModal,
  } = props;

  const isFirst = stepIndex === 1;

  const title = isFirst ? 'Complete profile' : 'Icebreaker';
  const submitCopy = isFirst ? 'Next' : 'Post Icebreaker';
  const cancelMessage = isFirst ? null : "I don't want to post an icebreaker.";

  const onSubmit = isFirst ? (
    () => openSignupModal(eventId, stepIndex + 1)
  ) : closeModal;

  return (
    <BaseModal
      title={title}
      submitCopy={submitCopy}
      cancelMessage={cancelMessage}
      stepIndex={stepIndex}
      totalSteps={TOTAL_STEPS}
      onSubmit={onSubmit}
    />
  );
}

SignupModal.actionCreators = {
  openSignupModal,
  closeModal,
};

export default Rivet(SignupModal);
