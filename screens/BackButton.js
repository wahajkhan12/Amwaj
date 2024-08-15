
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// ... import other necessary components and screens

const BackButton = () => {
  useEffect(() => {
    const handleBackButton = () => {
      BackHandler.exitApp(); // This will immediately exit the app
      return true; // Prevent default back button behavior
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
}
export default BackButton;
