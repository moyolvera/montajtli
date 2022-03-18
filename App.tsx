import * as React from 'react';
import Config from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthProvider, LoaderProvider } from '@context';
import { commonStyles } from '@theme';

import AppNavigator from './src/AppNavigator';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID
});

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <GestureHandlerRootView style={commonStyles.flexOne}>
          <AppNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
