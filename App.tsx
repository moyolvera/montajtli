import 'react-native-gesture-handler';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '@utils';
import { AuthProvider } from '@context';

import AppNavigator from './src/AppNavigator';

initializeApp(FIREBASE_CONFIG);

function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
