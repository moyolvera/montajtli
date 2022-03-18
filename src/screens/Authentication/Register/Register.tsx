import * as React from 'react';
import { View } from 'react-native';
import { commonStyles } from '@theme';
import { Text } from '@components';

interface RegisterProps {}

function RegisterScreen({}: RegisterProps) {
  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Register</Text>
    </View>
  );
}

export default RegisterScreen;
