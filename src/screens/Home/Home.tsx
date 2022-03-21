import * as React from 'react';
import { View, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import { AddProject, Text } from '@components';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { user, signOut } = useAuthContext();
  const [needsEmailVerify, setNeedsEmailVerify] = React.useState(false);

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

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      {needsEmailVerify && <Text>Needs verify Email</Text>}
      <AddProject />
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </View>
  );
}

export default HomeScreen;
