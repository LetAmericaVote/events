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
} from '../actions';
import {
  selectIsAuthenticated,
  selectAuthUserId,
  selectAuthenticatedUserFirstName,
} from '../selectors';

class SignupButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasClicked: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const triggger = ! prevState.hasClicked || ! prevProps.isAuthenticated;
    const condition = this.state.hasClicked && this.props.isAuthenticated;

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

    const setClicked = () => this.setState({ hasClicked: true });

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
});

SignupButton.actionCreators = {
  signupForEvent,
  openSignupModal,
};

export default Rivet(SignupButton);
