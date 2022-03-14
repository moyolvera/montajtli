import * as React from 'react';

// TODO: Replace this with firebase user object
type User = {};

type AuthContextType = {
  user: User | null | undefined;
  signIn?: () => void;
  signOut?: () => void;
  signUp?: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>();

  function signIn() {
    setUser(null);
  }

  function signOut() {}

  function signUp() {}

  const value = React.useMemo(
    () => ({ user, signIn, signOut, signUp }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
