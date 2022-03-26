import * as React from 'react';
import { Button } from 'react-native';
import { useAuthContext } from '@hooks';
import { AddProject, HomeHeader, Text, Container } from '@components';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { users } from '@actions';
import { RootStackParamList } from 'src/AppNavigator';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { user, signOut, updateUser } = useAuthContext();
  const [needsEmailVerify, setNeedsEmailVerify] = React.useState(false);
  const isFocused = useIsFocused();
  const { params: { refresh } = {} } =
    useRoute<RouteProp<RootStackParamList, 'Home'>>();

  async function attemptGoogleSignOut() {
    await signOut();
  }

  React.useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.isVerified) {
      setNeedsEmailVerify(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (isFocused && refresh && user) {
      users
        .getUserByUid(user.uid)
        .then(fetchedUser => {
          updateUser({ ...fetchedUser, isVerified: user.isVerified });
        })
        .catch(console.error);
    }
  }, [isFocused]);

  return (
    <Container>
      <HomeHeader />
      {needsEmailVerify && <Text>Needs verify Email</Text>}
      <AddProject />
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </Container>
  );
}

export default HomeScreen;
