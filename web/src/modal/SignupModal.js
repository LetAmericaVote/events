import React from 'react';
import Rivet from '../hoc/Rivet';
import BaseModal from './BaseModal';
import ProfileForm from '../forms/ProfileForm';
import IceBreakerForm from '../forms/IcebreakerForm';
import {
  selectForm,
} from '../selectors';
import {
  openSignupModal,
  closeModal,
  updateAuthenticatedUser,
  postComment,
} from '../actions';

const TOTAL_STEPS = 2;
const PROFILE_FORM = 'PROFILE_FORM';
const ICE_BREAKER_FORM = 'ICE_BREAKER_FORM';

const SignupModal = (props) => {
  const {
    eventId,
    stepIndex,
  } = props;

  const isFirst = stepIndex === 1;

  const title = isFirst ? 'Complete profile' : 'Icebreaker';
  const submitCopy = isFirst ? 'Next' : 'Post Icebreaker';
  const cancelMessage = isFirst ? null : "I don't want to post an icebreaker.";

  // @NOTE: This is to prevent the form from re-rendering & losing the input ref.
  const SubmitWrapper = (SubmitButton) => {
    const Wrapper = (props) => {
      const {
        children,
        openSignupModal,
        closeModal,
        profileForm,
        icebreakerForm,
        updateAuthenticatedUser,
        postComment,
      } = props;

      const onSubmit = isFirst ? (
        () => {
          updateAuthenticatedUser(profileForm);
          openSignupModal(eventId, stepIndex + 1);
        }
      ) : (
        () => {
          const { answer, question } = icebreakerForm;
          const message = `"${question}" \n ${answer}`;

          postComment(message, eventId);
          closeModal();
        }
      );

      return (
        <SubmitButton onClick={onSubmit}>
          {children}
        </SubmitButton>
      );
    }

    Wrapper.mapStateToProps = (state) => ({
      profileForm: selectForm(PROFILE_FORM, state),
      icebreakerForm: selectForm(ICE_BREAKER_FORM, state),
    });

    Wrapper.actionCreators = {
      openSignupModal,
      closeModal,
      updateAuthenticatedUser,
      postComment,
    };

    return Rivet(Wrapper);
  };

  const ModalContent = () => isFirst ? (
    <ProfileForm formName={PROFILE_FORM} />
  ) : (
    <IceBreakerForm formName={ICE_BREAKER_FORM} />
  );

  return (
    <BaseModal
      title={title}
      submitCopy={submitCopy}
      cancelMessage={cancelMessage}
      stepIndex={stepIndex}
      totalSteps={TOTAL_STEPS}
      SubmitWrapper={SubmitWrapper}
    >
      <ModalContent />
    </BaseModal>
  );
}

export default Rivet(SignupModal);
