import * as React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authentication } from '@actions';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null | undefined;
  signIn?: () => Promise<void>;
  signOut?: () => Promise<void>;
  signUp?: (userData: FirebaseAuthTypes.UserCredential) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();

  const value = React.useMemo(
    () => ({
      user,
      signIn: authentication.signIn,
      signOut: authentication.signOut,
      signUp: authentication.signUp
    }),
    [user]
  );

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
