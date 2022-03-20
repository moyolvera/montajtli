import * as React from 'react';
import { View, Button } from 'react-native';
import { commonStyles } from '@theme';
import { useAuthContext } from '@hooks';
import { Input } from '@components';
import Feather from 'react-native-vector-icons/Feather';
import { validators } from '@utils';
import { InputHandlers } from '@components/Input/Input';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from 'src/AppNavigator';

const { isRequired, isValidEmail, minLenghtFormat } = validators;

interface LoginProps {}

function LoginScreen({}: LoginProps) {
  const { navigate } = useNavigation<ScreenNavigationProp>();
  const { signIn } = useAuthContext();
  const emailRef = React.useRef<InputHandlers>(null);
  const passwordRef = React.useRef<InputHandlers>(null);

  function onEmailPasswordSubmit() {
    if (
      !emailRef.current ||
      !emailRef.current.validate() ||
      !passwordRef.current ||
      !passwordRef.current.validate()
    ) {
      return;
    }

    const email = emailRef.current?.getValue();
    const password = passwordRef.current?.getValue();

    signIn(email, password);
  }

  function requireRegister() {
    navigate('Register');
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Input
        ref={emailRef}
        label="Email"
        customValidations={[isRequired(), isValidEmail()]}
        renderLeftIcon={<Feather name="user" color="#a4abac" size={16} />}
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Input
        ref={passwordRef}
        label="Contraseña"
        customValidations={[isRequired(), minLenghtFormat(8)]}
        renderLeftIcon={<Feather name="lock" color="#a4abac" size={16} />}
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="go"
      />
      <Button title="Usar contraseña" onPress={onEmailPasswordSubmit} />
      <Button title="Registrarse" onPress={requireRegister} />
      <Button title="Google SignIn" onPress={signIn as VoidFunction} />
    </View>
  );
}

export default LoginScreen;
