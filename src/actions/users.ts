import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserItem } from '@utils/types';

async function saveNewUser(userData: FirebaseAuthTypes.UserCredential) {
  await firestore()
    .collection('users')
    .doc(userData.user.uid)
    .set({
      uid: userData.user.uid,
      email: userData.user.email || '',
      displayName: userData.user.displayName || '',
      photoURL: userData.user.photoURL || '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      projects: []
    });
}

async function getUserByUid(uid: string) {
  const user = await firestore().collection('users').doc(uid).get();

  return user.data() as UserItem;
}

async function updateUser({ uid, ...props }: Partial<UserItem>) {
  await firestore()
    .collection('users')
    .doc(uid)
    .update({
      ...props
    });
}

export default {
  getUserByUid,
  saveNewUser,
  updateUser
};
