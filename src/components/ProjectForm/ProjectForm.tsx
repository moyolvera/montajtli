import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyles } from '@theme';
import { Input, Text, Button, SimpleHeader } from '@components';
import firestore from '@react-native-firebase/firestore';
import { InputHandlers } from '@components/Input/Input';
import { project, users } from '@actions';
import { useAuthContext } from '@hooks';
import { validators } from '@utils';
import { ProjectPermissions } from '@actions/project';
import colors from '@theme/colors';

import styles from './ProjectForm.styles';

const { minLenghtFormat, isRequired } = validators;

interface ProjectFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

function ProjectForm({ onClose, onSuccess }: ProjectFormProps) {
  const { user } = useAuthContext();
  const nameRef = React.useRef<InputHandlers>(null);
  const descriptionRef = React.useRef<InputHandlers>(null);

  async function onSubmit() {
    if (
      !user ||
      !nameRef.current ||
      !nameRef.current.validate() ||
      !descriptionRef.current ||
      !descriptionRef.current.validate()
    ) {
      return;
    }

    const name = nameRef.current?.getValue();
    const description = descriptionRef.current?.getValue();

    try {
      const id = await project.saveProject({ name, description });

      const currentPermissions = user?.projects || [];
      currentPermissions.push({
        id,
        permission: ProjectPermissions.creator
      });

      await users.updateUser({
        uid: user?.uid,
        projects: currentPermissions,
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[commonStyles.flexOne]}>
      <SimpleHeader
        left={
          <TouchableOpacity onPress={onClose}>
            <Feather name="chevron-left" color={colors.black} size={32} />
          </TouchableOpacity>
        }>
        project.add.create_title
      </SimpleHeader>
      <Text font="light" style={commonStyles.rightLabel}>
        project.add.create_description
      </Text>
      <View style={commonStyles.paddingHorizontal}>
        <Input
          ref={nameRef}
          renderLeftIcon={<Feather name="edit" color="#a4abac" size={16} />}
          customValidations={[isRequired(), minLenghtFormat(5)]}
          label="Nombre del proyecto"
          blurOnSubmit
          returnKeyType="next"
        />
        <Input
          ref={descriptionRef}
          renderLeftIcon={<Feather name="book" color="#a4abac" size={16} />}
          customValidations={[isRequired(), minLenghtFormat(12)]}
          label="Descripcion del proyecto"
          blurOnSubmit
          multiline
          numberOfLines={4}
          style={styles.descriptionInput}
          returnKeyType="done"
        />
      </View>
      <View style={commonStyles.paddingHorizontal}>
        <Button title="common.save" onPress={onSubmit} />
        <Button link title="common.cancel" onPress={onClose} />
      </View>
    </View>
  );
}

export default ProjectForm;
