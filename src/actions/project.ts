import firestore from '@react-native-firebase/firestore';
import { ProjectItem } from '@utils/types';

async function getProjectsById(uid: string) {
  const projects = await firestore()
    .collection('projects')
    .where('id', '==', uid)
    .get();

  const projectsArray: ProjectItem[] = [];

  projects.forEach(doc => projectsArray.push(doc.data() as ProjectItem));

  return projectsArray;
}

export default { getProjectsById };
