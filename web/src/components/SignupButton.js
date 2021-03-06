import React from 'react';
import Rivet from '../hoc/Rivet';
import GoogleAuth from '../hoc/GoogleAuth';
import Face from './Face';
import { FlexAcross, FlexAcrossAlignCenter } from '../blocks/Flex';
import { GoogleIcon } from '../blocks/Icons';
import { SecondaryCallToAction } from '../blocks/Button';
import {
  signupForEvent,
  openSignupModal,
  setFormValue,
} from '../actions';
import {
  selectIsAuthenticated,
  selectAuthUserId,
  selectAuthenticatedUserFirstName,
  selectFormValue,
} from '../selectors';

class SignupButton extends React.Component {
  componentDidUpdate(prevProps) {
    const triggger = ! prevProps.hasClicked || ! prevProps.isAuthenticated;
    const condition = this.props.hasClicked && this.props.isAuthenticated;

    if (triggger && condition && this.props.eventId) {
      this.props.signupForEvent(this.props.eventId);
      this.props.openSignupModal(this.props.eventId);
    }
  }

  render() {
    const {
      isAuthenticated,
      authenticatedUserId,
      authenticatedFirstName,
      setFormValue,
    } = this.props;

    const SignupButtonFlow = (props) => {
      const {
        children,
        onSignupPress,
        showLoginDialog,
        isSafeToClick,
        isAuthenticated,
      } = props;

      const isDisabled = isAuthenticated ? false : ! isSafeToClick;

      const onClick = () => {
        if (isDisabled) {
          return;
        }

        onSignupPress();

        if (showLoginDialog) {
          showLoginDialog();
        }
      }

      return (
        <SecondaryCallToAction disabled={isDisabled} onClick={onClick}>
          {children}
        </SecondaryCallToAction>
      );
    };

    const WrappedSignup = isAuthenticated ?
      SignupButtonFlow : GoogleAuth(SignupButtonFlow);

    const setClicked = () => setFormValue('auth', `click-${this.props.eventId}`, true);

    const InnerSignup = () => isAuthenticated ? (
      <FlexAcrossAlignCenter>
        <Face userId={authenticatedUserId} indent />
        Sign Up As {authenticatedFirstName}
      </FlexAcrossAlignCenter>
    ) : (
      <FlexAcross>
        <GoogleIcon />
        Sign Up With Google
      </FlexAcross>
    );

    return (
      <WrappedSignup
        isAuthenticated={isAuthenticated}
        onSignupPress={setClicked}
      >
        <InnerSignup />
      </WrappedSignup>
    );
  }
}

SignupButton.mapStateToProps = (state, ownProps) => ({
  isAuthenticated: selectIsAuthenticated(state),
  authenticatedUserId: selectAuthUserId(state),
  authenticatedFirstName: selectAuthenticatedUserFirstName(state),
  hasClicked: selectFormValue('auth', `click-${ownProps.eventId}`, state),
});

SignupButton.actionCreators = {
  signupForEvent,
  openSignupModal,
  setFormValue,
};

export default Rivet(SignupButton);
