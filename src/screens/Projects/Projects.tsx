import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '@theme';
import { ScreenNavigationProp } from 'src/AppNavigator';
import {
  Container,
  ProductItem,
  ProductsActions,
  ProjectForm,
  SimpleHeader,
  Text
} from '@components';
import Feather from 'react-native-vector-icons/Feather';
import colors from '@theme/colors';
import { useProjectsContext } from '@hooks';
import { ProjectItem } from '@utils/types';
import dimensions from '@utils/dimensions';

interface ProjectsProps {}

type RegistrationActionType = 'add' | 'join';

function renderProductItem({ item }: { item: ProjectItem }) {
  return <ProductItem item={item} />;
}

function ProjectsScreen({}: ProjectsProps) {
  const { navigate, goBack } = useNavigation<ScreenNavigationProp>();
  const [actionType, setActionType] = React.useState<RegistrationActionType>();
  const [showActions, setShowActions] = React.useState(false);
  const { projects } = useProjectsContext();

  function addProject() {
    setActionType('add');
  }

  function joinProject() {
    setActionType('join');
  }

  function clearActionType() {
    setActionType(undefined);
  }

  function toggleActions() {
    setShowActions(!showActions);
  }

  function onSuccess() {
    navigate('Home', { refresh: true });
  }

  console.log(projects);

  return (
    <Container scrollEnabled={true}>
      <SimpleHeader
        left={
          <TouchableOpacity onPress={goBack}>
            <Feather name="chevron-left" color={colors.black} size={32} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity onPress={toggleActions}>
            <Feather name="plus" color={colors.black} size={32} />
          </TouchableOpacity>
        }>
        project.title
      </SimpleHeader>
      <ProductsActions
        showActions={showActions}
        addAction={addProject}
        joinAction={joinProject}
      />
      <View style={commonStyles.marginTop8}>
        <Text font="light" style={commonStyles.rightLabel}>
          registered products
        </Text>
        <FlatList
          data={projects}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
        />
      </View>
      {actionType === 'join' && <Text>Unirse a proyecto</Text>}
      <AnimatePresence>
        {actionType === 'add' && (
          <MotiView
            style={[
              commonStyles.absolute,
              commonStyles.flexOneJustifyCenter,
              {
                height: dimensions.HEIGHT,
                width: '100%',
                backgroundColor: colors.light
              }
            ]}
            from={{ transform: [{ translateX: 50 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 50 }], opacity: 0 }}>
            <ProjectForm onClose={clearActionType} onSuccess={onSuccess} />
          </MotiView>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default ProjectsScreen;
