import React, { Component } from 'react';
import Rivet from './Rivet';
import { postGoogleIdToken } from '../actions';

// TODO: Make sure we notify people if the pop-up blocker catches it for some reason.

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// WATCH: https://github.com/google/google-api-javascript-client/issues/399
function testGAPI() {
  return !!window.gapi && !!window.gapi.load;
}

function GoogleAuthHOC(InnerComponent) {
  class GoogleAuthButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
        gapiIsReady: testGAPI(),
      };

      this.googleAuth = null;
      this.onLogin = this.onLogin.bind(this);
      this.setupProcedure = this.setupProcedure.bind(this);
      this.checkIfReadyToSetup = this.checkIfReadyToSetup.bind(this);
    }

    componentDidMount() {
      if (this.state.gapiIsReady) {
        this.setupProcedure();
        return;
      }

      setTimeout(this.checkIfReadyToSetup, 100);
    }

    checkIfReadyToSetup() {
      const gapiIsReady = testGAPI();

      if (gapiIsReady) {
        this.setState({
          gapiIsReady,
        });

        this.setupProcedure();
        return;
      }

      setTimeout(this.checkIfReadyToSetup, 100);
    }

    setupProcedure() {
      const setupAuth = async () => {
        const authOptions = {
          fetch_basic_profile: true,
          client_id: clientId
        };

        window.gapi.auth2.init(authOptions).then((googleAuth) => {
          this.googleAuth = googleAuth;
        }, (error) => {
          // TODO: Handle error.
          // More info here: https://developers.google.com/api-client-library/javascript/reference/referencedocs#auth-setup
          console.error(error);
        });
      };

      window.gapi.load('auth', setupAuth);
    }

    onLogin () {
      console.log(this.googleAuth);
      const login = async () => {
        try {
          const user = await this.googleAuth.signIn();
          const token = user.getAuthResponse().id_token;

          this.props.postGoogleIdToken(token);
        } catch (error) {
          // TODO: Handle error.
          // More info here: https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
          console.error(error);
        }
      };

      login();
    }

    render() {
      const innerProps = {
        showLoginDialog: this.onLogin,
        isSafeToClick: this.state.gapiIsReady,
      };

      return (
        <InnerComponent {...innerProps} {...this.props} />
      );
    }
  }

  GoogleAuthButton.actionCreators = {
    postGoogleIdToken,
  };

  return Rivet(GoogleAuthButton)
}

export default GoogleAuthHOC;
