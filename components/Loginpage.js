import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook if using React Navigation
import background from '../assets/images/gradientbgcurve.png';
import logo from '../assets/images/home.png';

const LoginPage = () => {
  const navigation = useNavigation(); // Initialize navigation if using React Navigation

  const handleStudentLogin = () => {
    // Implement student login logic here
    // Example: navigate to the student login screen
    navigation.navigate('StudentLoginPage'); // Replace with your actual screen name
  };

  const handleTutorLogin = () => {
    // Implement tutor login logic here
    // Example: navigate to the tutor login screen
    navigation.navigate('TutorLoginPage'); // Replace with your actual screen name
  };

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.welcomeText}>Welcome to SR Tutorial</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonBackground}>
            <Pressable style={styles.button} onPress={handleStudentLogin}>
              <Text style={styles.buttonText}>Student Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleTutorLogin}>
              <Text style={styles.buttonText}>Tutor Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    color: 'black', // Black font color
    fontSize: 24, // Adjust the font size as needed
    marginTop: '5%', // Adjust the margin top as needed
  },
  buttonContainer: {
    marginTop: '5%', // Adjust the margin top as needed
    alignItems: 'center',
  },
  buttonBackground: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#448aff',
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginPage;
