import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

async function signUp(userData: FirebaseAuthTypes.UserCredential) {
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

async function signIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await new Promise(resolve => {
      auth()
        .signInWithCredential(googleCredential)
        .then(async userCredential => {
          if (userCredential.additionalUserInfo?.isNewUser) {
            await signUp(userCredential);
          }
        })
        .catch(error => {
          console.log('error: ' + error);
        })
        .finally(() => resolve({}));
    });
  } catch (error) {
    console.log(error);
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
