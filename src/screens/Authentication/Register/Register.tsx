import * as React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '@theme';

interface RegisterProps {}

function RegisterScreen({}: RegisterProps) {
  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Register</Text>
    </View>
  );
}

export default RegisterScreen;
