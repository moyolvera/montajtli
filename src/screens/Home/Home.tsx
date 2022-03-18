import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import { Input } from '@components';
import Feather from 'react-native-vector-icons/Feather';
import { InputHandlers } from '@components/Input/Input';
import { validators } from '@utils';

interface HomeProps {}

function HomeScreen({}: HomeProps) {
  const { signOut } = useAuthContext();
  const inputRef = React.useRef<InputHandlers>(null);

  async function attemptGoogleSignOut() {
    await signOut();
  }

  function validateInput() {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.validate();
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Home</Text>
      <Input
        ref={inputRef}
        customValidations={[validators.isValidEmail()]}
        renderLeftIcon={<Feather name="maximize-2" size={16} color="#000" />}
        label="Input"
        autoCapitalize="none"
      />
      <Input label="Otro Input" />
      <Feather name="maximize-2" size={28} color="#000" />
      <Button title="Validate" onPress={validateInput} />
      <Button title="SignOut" onPress={attemptGoogleSignOut} />
    </View>
  );
}

export default HomeScreen;
