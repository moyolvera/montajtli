import * as React from 'react';
import { FIREBASE_CONFIG } from '@utils';
import { AuthProvider } from '@context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import AppNavigator from './src/AppNavigator';
import { commonStyles } from '@theme';

// initializeApp(FIREBASE_CONFIG);

GoogleSignin.configure({
  webClientId: ''
});

function App() {
  return (
    <GestureHandlerRootView style={commonStyles.flexOne}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
