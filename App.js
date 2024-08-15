import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import StackNavigator from './assets/screens/Navigation/StackNavigator';
import { AuthProvider } from './assets/screens/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './assets/screens/SplashScreen';
function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Perform any asynchronous tasks or data loading here
    const fetchData = async () => {
      // Simulating a 3-second delay
      setTimeout(() => {
        setAppIsReady(true);
      }, 4000);
    };

    fetchData();
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;