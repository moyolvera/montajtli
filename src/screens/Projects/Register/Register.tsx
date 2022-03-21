import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '@theme';
import { ScreenNavigationProp } from 'src/AppNavigator';

interface RegisterProjectProps {}

type RegistrationActionType = 'add' | 'join';

function RegisterProjectScreen({}: RegisterProjectProps) {
  const { goBack } = useNavigation<ScreenNavigationProp>();
  const [actionType, setActionType] = React.useState<RegistrationActionType>();

  function addProject() {
    setActionType('add');
  }

  function joinProject() {
    setActionType('join');
  }

  function clearActionType() {
    setActionType(undefined);
  }

  return (
    <View style={commonStyles.flexOneCenter}>
      <Text>Projectos</Text>

      <Button title="Atras" onPress={goBack} />
      <Button title="Crear" onPress={addProject} />
      <Button title="Unirse" onPress={joinProject} />
      <Button title="Limpiar" onPress={clearActionType} />

      <AnimatePresence>
        {actionType === 'add' && (
          <MotiView
            from={{ transform: [{ translateX: 50 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 50 }], opacity: 0 }}>
            <Text>Crear proyecto</Text>
          </MotiView>
        )}
      </AnimatePresence>
      {actionType === 'join' && <Text>Unirse a proyecto</Text>}
    </View>
  );
}

export default RegisterProjectScreen;
