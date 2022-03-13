import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '@utils';

import AppNavigator from './src/AppNavigator';

initializeApp(FIREBASE_CONFIG);

function App() {
  return <AppNavigator />;
}

export default App;
