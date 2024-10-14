import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font'; // Updated import
import * as SplashScreen from 'expo-splash-screen';

const background = require('../assets/images/mobilelogin.png');
const usernameIcon = require('../assets/images/user.png');
const passwordIcon = require('../assets/images/password.png');

const StudentLoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/Poppins/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
    }
  }, [fontsLoaded]);

  const handleLogin = async () => {
    try {
      // Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Fetch student data
      const studentsRef = ref(db, 'students');
      const queryRef = query(studentsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(queryRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        const user = userData[userId];
        if (user.password === password) {
          console.log('Login successful');
          navigation.navigate('StudentHomeScreen', { userId }); // Pass userId as a parameter
        } else {
          console.log('Incorrect password');
          setError('Incorrect email or password');
        }
      } else {
        console.log('User not found');
        setError('User not found');
      }
    } catch (error) {
      console.error('Error logging in: ', error.message);
      setError(error.message);
    }
  };

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.trphoto2} />
      <Text style={styles.title}>Student Login</Text>
      <View style={styles.inputContainer}>
        <Image source={usernameIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#1b58a8"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#1b58a8"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trphoto2: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    color: '#1b58a8', // Blue color
    fontSize: 25,
    marginTop: 20,
    fontFamily: 'Poppins-Bold', // Apply custom font
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#1b58a8', // Blue color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular', // Apply custom font
  },
  loginButton: {
    backgroundColor: '#1b58a8', // Blue color
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Bold', // Apply custom font
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default StudentLoginPage;
