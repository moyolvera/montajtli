import * as React from 'react';
import { Button, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyles } from '@theme';
import { Input, Text } from '@components';
import firestore from '@react-native-firebase/firestore';
import { InputHandlers } from '@components/Input/Input';
import { project, users } from '@actions';
import { useAuthContext } from '@hooks';
import { validators } from '@utils';
import { ProjectPermissions } from '@actions/project';

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
    <View style={commonStyles.backgroundWhite}>
      <Text>Crea un nuevo proyecto</Text>
      <Text>
        Aqui podras registrar los datos de tu marca, proyecto o servicio
      </Text>
      <Text>
        Si tienes una tienda, ofreces un servicio o eres prestamista ingresa tus
        datos aqui
      </Text>
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
        numberOfLines={2}
        returnKeyType="done"
      />
      <Button title="Cancelar" onPress={onClose} />
      <Button title="Guardar" onPress={onSubmit} />
    </View>
  );
}

export default ProjectForm;
