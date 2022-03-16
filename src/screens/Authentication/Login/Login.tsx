import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '@theme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface LoginProps {}

function LoginScreen({}: LoginProps) {
  async function attemptGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Login</Text>
      <Button title="SignIn" onPress={attemptGoogleSignIn} />
    </View>
  );
}

export default LoginScreen;
