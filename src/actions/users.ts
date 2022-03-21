import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserItem } from '@utils/types';

async function saveNewUser(userData: FirebaseAuthTypes.UserCredential) {
  await firestore()
    .collection('users')
    .add({
      uid: userData.user.uid,
      email: userData.user.email || '',
      displayName: userData.user.displayName || '',
      photoURL: userData.user.photoURL || '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      accounts: []
    });
}

async function getUserByUid(uid: string) {
  const user = await firestore()
    .collection('users')
    .where('uid', '==', uid)
    .get();

  const userArray: UserItem[] = [];

  user.forEach(doc => userArray.push(doc.data() as UserItem));

  return userArray[0];
}

export default {
  getUserByUid,
  saveNewUser
};
