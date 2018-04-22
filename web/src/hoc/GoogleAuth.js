import React, { Component } from 'react';
import Rivet from './Rivet';
import { GOOGLE_AUTH_ROUTE } from '../routing/routes';
import { setBackUrl } from '../routing/authRedirect';

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
          client_id: clientId,
          ux_mode: 'redirect',
          redirect_uri: `${window.location.origin}${GOOGLE_AUTH_ROUTE}`,
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
      setBackUrl(window.location.pathname);

      try {
        this.googleAuth.signIn();
      } catch (error) {
        // TODO: Handle error.
        // More info here: https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
        console.error(error);
      }
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

  return Rivet(GoogleAuthButton)
}

export default GoogleAuthHOC;
