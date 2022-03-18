import * as React from 'react';
import { View, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import { Text } from '@components';

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
