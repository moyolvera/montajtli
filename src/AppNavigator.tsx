import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { useAuthContext } from '@hooks';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  RegisterProjectScreen
} from '@screens';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Home?: { refresh?: boolean };
  RegisterProject: undefined;
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
    async function prepare() {
      // TODO: Prevent splash screen from hiding
      // await SplashScreen.preventAutoHideAsync();
    }

    prepare().catch(console.error);
  }, []);

  React.useEffect(() => {
    async function prepareComplete() {
      // TODO: Hide splash screen
      // await SplashScreen.hideAsync();
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
            <Stack.Screen
              name="RegisterProject"
              component={RegisterProjectScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
