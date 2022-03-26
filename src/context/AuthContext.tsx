import * as React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authentication, users } from '@actions';
import { AuthResponse, UserItemWithVerify } from '@utils/types';

type AuthContextType = {
  user: UserItemWithVerify | null | undefined;
  signIn?: (email?: string, password?: string) => Promise<AuthResponse>;
  signUp?: (email: string, password: string) => Promise<AuthResponse>;
  signOut?: () => Promise<void>;
  updateUser?: (user: UserItemWithVerify) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserItemWithVerify | null>();

  const value = React.useMemo(
    () => ({
      user,
      signIn: authentication.signIn,
      signOut: authentication.signOut,
      signUp: authentication.signUp,
      updateUser: setUser
    }),
    [user]
  );

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) {
      setUser(user);
      return;
    }

    const userItem = await users.getUserByUid(user.uid);

    setUser({ ...userItem, isVerified: user.emailVerified });
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
