import firestore from '@react-native-firebase/firestore';
import { ProjectItem, UserItemProject } from '@utils/types';

export enum ProjectPermissions {
  creator = 'creator',
  member = 'member',
  guest = 'guest'
}

async function getProjectsById(id: string, permission?: ProjectPermissions) {
  const project = await firestore().collection('projects').doc(id).get();

  return { ...(project.data() as ProjectItem), id, permission };
}

async function saveProject({
  name,
  description
}: Pick<ProjectItem, 'name' | 'description'>) {
  const doc = await firestore().collection('projects').add({
    name,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp()
  });

  return doc.id;
}

async function getAllProjectsInArray(projects: UserItemProject[]) {
  const result = await Promise.all(
    projects.map(
      async project => await getProjectsById(project.id, project.permission)
    )
  );

  return result;
}

export default { getProjectsById, getAllProjectsInArray, saveProject };
