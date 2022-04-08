import * as React from 'react';
import { View } from 'react-native';
import useAuthContext from '@hooks/useAuthContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from 'src/AppNavigator';
import { Text, Button } from '@components';
import Feather from 'react-native-vector-icons/Feather';
import colors from '@theme/colors';

import styles from './AddProject.styles';

interface AddProjectProps {}

function AddProject({}: AddProjectProps) {
  const { user } = useAuthContext();
  const { navigate } = useNavigation<ScreenNavigationProp>();

  function handleAddProject() {
    navigate('Projects');
  }

  const userHasProjects = user && user.projects && user.projects.length > 0;

  return (
    <View style={styles.wrapper}>
      <Text font="bold" style={styles.title}>
        project.title
      </Text>
      <Text font="light" style={styles.description}>
        {!userHasProjects ? 'project.add.register' : 'project.add.manage'}
      </Text>
      <Button
        onPress={handleAddProject}
        title="common.go"
        icon={<Feather name="chevron-right" color={colors.white} size={14} />}
      />
    </View>
  );
}

export default AddProject;
