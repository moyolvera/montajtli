import * as React from 'react';
import { View, Text, Button } from 'react-native';
import useAuthContext from '@hooks/useAuthContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from 'src/AppNavigator';

interface AddProjectProps {}

function AddProject({}: AddProjectProps) {
  const { user } = useAuthContext();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  function handleAddProject() {
    navigate('RegisterProject');
  }

  const userHasProjects = user && user.projects && user.projects.length > 0;

  return (
    <View>
      <Button title="Agregar producto" onPress={handleAddProject} />
      {!userHasProjects && (
        <Text>
          Para comenzar necesitas registrar tu cuenta a un producto, puedes
          creear uno o unirte a un proyecto ya creado
        </Text>
      )}
    </View>
  );
}

export default AddProject;
