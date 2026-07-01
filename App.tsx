/**
 * Togethers
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { TOGETHERS_ESCROW_ADDRESS } from './config/wallet';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [greeted, setGreeted] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}>
      <Pressable onPress={() => setGreeted(true)}>
        {/* TODO: load this from IPFS (gateway URL) once a pinning service is set up */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </Pressable>
      {greeted && (
        <>
          <Text style={styles.greeting}>hello Togethers</Text>
          <Text style={styles.address}>{TOGETHERS_ESCROW_ADDRESS}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 32,
  },
  greeting: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '600',
  },
  address: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#0066cc',
  },
});

export default App;
