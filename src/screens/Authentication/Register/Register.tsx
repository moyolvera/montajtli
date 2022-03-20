import * as React from 'react';
import { Button, View } from 'react-native';
import { commonStyles } from '@theme';
import { Input, Text } from '@components';
import { InputHandlers } from '@components/Input/Input';
import { useAuthContext } from '@hooks';
import { isRequired, isValidEmail, minLenghtFormat } from '@utils/validators';
import Feather from 'react-native-vector-icons/Feather';

interface RegisterProps {}

function RegisterScreen({}: RegisterProps) {
  const { signUp } = useAuthContext();
  const emailRef = React.useRef<InputHandlers>(null);
  const passwordRef = React.useRef<InputHandlers>(null);
  const passwordConfirmRef = React.useRef<InputHandlers>(null);

  function onRegisterSubmit() {
    if (
      !emailRef.current ||
      !emailRef.current.validate() ||
      !passwordRef.current ||
      !passwordRef.current.validate() ||
      !passwordConfirmRef.current ||
      !passwordConfirmRef.current.validate()
    ) {
      return;
    }

    const email = emailRef.current?.getValue();
    const password = passwordRef.current?.getValue();
    const passwordConfirm = passwordConfirmRef.current?.getValue();

    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
      return;
    }

    signUp(email, password);
  }

  return (
    <View style={commonStyles.flexOneJustifyCenter}>
      <Text>Register</Text>
      <Input
        ref={emailRef}
        label="Email"
        customValidations={[isRequired(), isValidEmail()]}
        renderLeftIcon={<Feather name="user" color="#a4abac" size={16} />}
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        autoCorrect={false}
        autoComplete="email"
      />
      <Input
        ref={passwordRef}
        label="Contraseña"
        customValidations={[isRequired(), minLenghtFormat(8)]}
        renderLeftIcon={<Feather name="lock" color="#a4abac" size={16} />}
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="go"
        autoCorrect={false}
        autoComplete="password"
      />
      <Input
        ref={passwordConfirmRef}
        label="Confirma contraseña"
        customValidations={[isRequired(), minLenghtFormat(8)]}
        renderLeftIcon={<Feather name="lock" color="#a4abac" size={16} />}
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="go"
        autoCorrect={false}
        autoComplete="password"
      />
      <Button title="Registrarse" onPress={onRegisterSubmit} />
      <Button title="Iniciar sesion" />
    </View>
  );
}

export default RegisterScreen;
