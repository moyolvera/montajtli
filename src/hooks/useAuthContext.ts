import * as React from 'react';
import { AuthContext } from '@context';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

function useAuthContext() {
  const {
    user,
    signIn: requireSignIn,
    signOut: requireSignOut,
    signUp: requireSignUp
  } = React.useContext(AuthContext);

  const signIn = React.useCallback(async () => {
    if (requireSignIn) {
      await requireSignIn();
    }
  }, [requireSignIn]);

  const signOut = React.useCallback(async () => {
    if (requireSignOut) {
      await requireSignOut();
    }
  }, [requireSignOut]);

  const signUp = React.useCallback(
    async (user: FirebaseAuthTypes.UserCredential) => {
      if (requireSignUp) {
        await requireSignUp(user);
      }
    },
    [requireSignUp]
  );

  return {
    user,
    signIn,
    signOut,
    signUp
  };
}

export default useAuthContext;
