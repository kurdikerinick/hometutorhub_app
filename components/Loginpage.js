import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import logo from '../assets/images/hometutorhublogo.png';

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

const LoginPage = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/Poppins/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  const handleStudentLogin = () => {
    navigation.navigate('StudentLoginPage', { userId: 'student-id-placeholder' });
  };

  const handleTutorLogin = () => {
    navigation.navigate('TutorLoginPage', { userId: 'tutor-id-placeholder' });
  };

  return (
    <LinearGradient
      colors={['#1b58a8', '#1b58a8']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subText}>Please select your role to get started.</Text>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleStudentLogin}>
            <Text style={styles.buttonText}>Student</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleTutorLogin}>
            <Text style={styles.buttonText}>Tutor</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  welcomeText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: 200,
    height: 50,
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#1b58a8',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
});

export default LoginPage;
