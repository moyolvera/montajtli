import * as React from 'react';
import { AuthContext } from '@context';

import useLoaderContext from './useLoaderContext';

function useAuthContext() {
  const {
    user,
    signIn: requireSignIn,
    signOut: requireSignOut,
    signUp: requireSignUp
  } = React.useContext(AuthContext);
  const { setIsLoading } = useLoaderContext();

  const signIn = React.useCallback(
    async (email?: string, password?: string) => {
      if (requireSignIn) {
        setIsLoading(true);

        try {
          const response = await requireSignIn(email, password);
          if (response.error) {
            console.log('error: ' + response.error);
          }
        } catch (error) {
          console.log('Error: ', error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [requireSignIn]
  );

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
    async (email: string, password: string) => {
      if (requireSignUp) {
        await requireSignUp(email, password);
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
