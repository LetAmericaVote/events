import React, { Component } from 'react';

// TODO: All of this Google API stuff should go in a middleware.
// NOTES TO SELF FOR LATER:
//  - Make sure we notify people if the pop-up blocker catches it for some reason.
//  - How do we handle the library not being loaded yet?
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

class GoogleAuthButton extends Component {
  constructor(props) {
    super(props);

    this.googleAuth = null;
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
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
    const login = async () => {
      try {
        const user = await this.googleAuth.signIn();
        const token = user.getAuthResponse().id_token;

        fetch('http://localhost:5000/v1/auth/google', {
          method: 'POST',
          body: JSON.stringify({ token: token }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
        .then(res => res.json())
        .then(console.log);
      } catch (error) {
        // TODO: Handle error.
        // More info here: https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleauthsignin
        console.error(error);
      }
    };

    login();
  }

  render() {
    return (
      <button onClick={this.onLogin}>login with the googles</button>
    )
  }
}

export default GoogleAuthButton;
