import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAppSelector } from './store/hooks';
import types from './store/constants/actionTypes';

import Explore from './screens/ExploreScreen';
import Home from './screens/HomeScreen';
import NotFound from './screens/NotFoundScreen';
import PublicScreen from './screens/PublicScreen';
import LoginScreen from './screens/LoginScreen';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute' as const,
          },
          default: {},
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: '404', headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function PublicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Public"
        component={PublicScreen}
        options={{ headerShown: true, title: 'Public' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: 'Login' }}
      />
    </Stack.Navigator>
  );
}

export function Navigation(props: any) {
  const { isAuth } = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector((state) =>
    state.fetching.pendingActionTypes.includes(types.SIGN_IN),
  );

  if (isLoading) {
    return (
      <NavigationContainer {...props}>
        <LoadingScreen />
      </NavigationContainer>
    );
  }

  if (isAuth) {
    return (
      <NavigationContainer {...props}>
        <AuthenticatedStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer {...props}>
      <PublicStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

type RootStackParamList = {
  HomeTabs: undefined;
  NotFound: undefined;
};

type PublicStackParamList = {
  Public: undefined;
  Login: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, PublicStackParamList {}
  }
}
