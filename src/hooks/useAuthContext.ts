import * as React from 'react';
import { AuthContext } from '@context';
import { useLoaderContext } from '@hooks';
import { UserItemWithVerify } from '@utils/types';

function useAuthContext() {
  const {
    user,
    signIn: requireSignIn,
    signOut: requireSignOut,
    signUp: requireSignUp,
    updateUser: requireUpdateUser
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

  const updateUser = React.useCallback(
    (user: UserItemWithVerify) => {
      if (requireUpdateUser) {
        requireUpdateUser(user);
      }
    },
    [requireUpdateUser]
  );

  return {
    user,
    signIn,
    signOut,
    signUp,
    updateUser
  };
}

export default useAuthContext;
