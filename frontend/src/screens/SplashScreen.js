import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate to the home screen after 3 seconds
      navigation.replace('Signup');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { width, height } = Dimensions.get('window');
  const imageSize = Math.min(width, height) * 0.8;

  return (
    <View style={styles.container}>
      <Image source={require('../assessts/qw.png')} style={[styles.image, { width: imageSize, height: imageSize }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    resizeMode: 'contain',
  },
});

export default SplashScreen;