import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { signOut } = useAuthContext();

  async function attemptGoogleSignOut() {
    await signOut();
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Home</Text>
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </View>
  );
}

export default HomeScreen;
