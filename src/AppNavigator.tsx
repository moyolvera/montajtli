import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { useAuthContext } from '@hooks';
import { HomeScreen, LoginScreen, RegisterScreen } from '@screens';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Home: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();

const SCREEN_OPTIONS = { headerShown: false };

function AppNavigator() {
  const { user } = useAuthContext();
  const [isNavigatorReady, setIsNavigatorReady] = React.useState(false);

  const onNavigatorReady = React.useCallback(() => {
    setIsNavigatorReady(true);
  }, []);

  React.useEffect(() => {
    // TODO: preventAutoHideAsync splash screen
  }, []);

  React.useEffect(() => {
    if (isNavigatorReady && typeof user !== 'undefined') {
      // TODO: Hide splash screen
    }
  }, [user, isNavigatorReady]);

  return (
    <NavigationContainer onReady={onNavigatorReady}>
      <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
        {user === null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
