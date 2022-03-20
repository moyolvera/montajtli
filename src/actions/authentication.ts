import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { AuthResponse } from '@utils/types';

async function saveNewUser(userData: FirebaseAuthTypes.UserCredential) {
  await firestore()
    .collection('users')
    .add({
      uid: userData.user.uid,
      email: userData.user.email || '',
      displayName: userData.user.displayName || '',
      photoURL: userData.user.photoURL || '',
      accounts: []
    });
}

async function signUp(email: string, password: string) {
  return await new Promise<AuthResponse>(resolve => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        if (userCredential.user?.email) {
          await saveNewUser(userCredential);
          resolve({ status: true });
        }
      })
      .catch(error => {
        console.log('error: ' + error);
        resolve({ status: false, error });
      })
      .finally(() => resolve({ status: true }));
  });
}

async function signIn(email?: string, password?: string) {
  if (email && password) {
    return await new Promise<AuthResponse>(resolve => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve({ status: true });
        })
        .catch(error => {
          resolve({ status: false, error });
        });
    });
  }

  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return await new Promise<AuthResponse>(resolve => {
      auth()
        .signInWithCredential(googleCredential)
        .then(async userCredential => {
          if (userCredential.additionalUserInfo?.isNewUser) {
            await saveNewUser(userCredential);
            resolve({ status: true });
          }
        })
        .catch(error => {
          console.log('error: ' + error);
          resolve({ status: false, error });
        })
        .finally(() => resolve({ status: true }));
    });
  } catch (error: any) {
    return { status: false, error };
  }
}

async function signOut() {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    console.log(error);
  }
}

export default { signIn, signOut, signUp };
