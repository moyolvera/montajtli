import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthResponse } from '@utils/types';
import users from './users';

const { saveNewUser } = users;

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
