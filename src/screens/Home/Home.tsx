import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import Feather from 'react-native-vector-icons/Feather';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { signOut } = useAuthContext();

  async function attemptGoogleSignOut() {
    await signOut();
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Home</Text>
      <Feather name="maximize-2" size={28} color="#000" />
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </View>
  );
}

export default HomeScreen;
