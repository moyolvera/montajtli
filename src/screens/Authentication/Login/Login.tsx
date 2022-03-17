import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';

interface LoginProps {}

function LoginScreen({}: LoginProps) {
  const { signIn } = useAuthContext();

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Login</Text>
      <Button title="SignIn" onPress={signIn} />
    </View>
  );
}

export default LoginScreen;
