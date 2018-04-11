import React from 'react';
import Rivet from '../hoc/Rivet';
import GoogleAuth from '../hoc/GoogleAuth';

const GoogleAuthButton = (props) => {
  const { isSafeToClick, showLoginDialog } = props;

  return (
    <button
      onClick={showLoginDialog}
      disabled={! isSafeToClick}
    >
      Login with the Googles
    </button>
  );
}

export default GoogleAuth(Rivet(GoogleAuthButton));
