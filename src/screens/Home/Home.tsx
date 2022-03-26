import * as React from 'react';
import { View, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import { AddProject, Text } from '@components';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { users } from '@actions';
import { useProjectsContext } from '@hooks';
import { RootStackParamList } from 'src/AppNavigator';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { user, signOut, updateUser } = useAuthContext();
  const { projects } = useProjectsContext();
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
    <View style={commonStyles.flexOneJustifyCenter}>
      {needsEmailVerify && <Text>Needs verify Email</Text>}
      {!!projects && projects.length > 0 && (
        <Text>{JSON.stringify(projects)}</Text>
      )}
      <Text>home.welcome</Text>
      <AddProject />
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </View>
  );
}

export default HomeScreen;
