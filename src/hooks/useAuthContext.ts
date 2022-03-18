import * as React from 'react';
import { AuthContext } from '@context';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import useLoaderContext from './useLoaderContext';

function useAuthContext() {
  const {
    user,
    signIn: requireSignIn,
    signOut: requireSignOut,
    signUp: requireSignUp
  } = React.useContext(AuthContext);
  const { setIsLoading } = useLoaderContext();

  const signIn = React.useCallback(async () => {
    if (requireSignIn) {
      setIsLoading(true);

      try {
        await requireSignIn();
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [requireSignIn]);

  const signOut = React.useCallback(async () => {
    if (requireSignOut) {
      setIsLoading(true);

      try {
        await requireSignOut();
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setIsLoading(false);
      }
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
