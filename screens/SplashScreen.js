import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import logo from '../anim.gif';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 4000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
        <Image source={logo} style={{ width: '90%', height: '60%',marginLeft: '5%' }} resizeMode='center' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Adjust background color as needed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
