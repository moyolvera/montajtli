import * as React from 'react';
import { AuthContext } from '@context';

function useAuthContext() {
  const {
    user,
    signIn: requireSignIn,
    signOut: requireSignOut,
    signUp: requireSignUp
  } = React.useContext(AuthContext);

  const signIn = React.useCallback(() => {
    if (requireSignIn) {
      requireSignIn();
    }
  }, [requireSignIn]);

  const signOut = React.useCallback(() => {
    if (requireSignOut) {
      requireSignOut();
    }
  }, [requireSignOut]);

  const signUp = React.useCallback(() => {
    if (requireSignUp) {
      requireSignUp();
    }
  }, [requireSignUp]);

  return {
    user,
    signIn,
    signOut,
    signUp
  };
}

export default useAuthContext;
