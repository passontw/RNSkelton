import 'react-native-reanimated';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { Colors } from './constants/Colors';
import { Navigation } from './navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './navigation/store/configureStore';

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const theme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation
          theme={theme}
          linking={{
            enabled: 'auto',
            prefixes: [
              'helloworld://',
            ],
          }}
          onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
      </PersistGate>
    </Provider>
  );
}
