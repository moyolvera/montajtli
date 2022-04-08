import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import { useAuthContext } from '@hooks';
import { HomeScreen, LoginScreen, RegisterScreen, Projects } from '@screens';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Home?: { refresh?: boolean };
  Projects: undefined;
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
    async function prepareComplete() {
      await RNBootSplash.hide({ fade: true });
    }

    if (isNavigatorReady && typeof user !== 'undefined') {
      prepareComplete().catch(console.error);
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
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Projects" component={Projects} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
