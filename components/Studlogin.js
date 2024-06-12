import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, query, orderByChild, equalTo, get, child, value } from 'firebase/database'; 
import { db } from '../firebase.js'; 
import { useNavigation } from '@react-navigation/native'; 

const background = require('../assets/images/trphoto2.png');
const usernameIcon = require('../assets/images/user.png');
const passwordIcon = require('../assets/images/password.png');

const StudentLoginPage = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
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
  
  return (
    <View style={styles.container}>
      <Image source={background} style={styles.trphoto2} />
      <Text style={styles.title}>Student Login</Text>
      <View style={styles.inputContainer}>
        <Image source={usernameIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#448aff"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#448aff"
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
    color: '#448aff', // Blue color
    fontSize: 24,
    marginTop: 20,
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
    borderColor: '#448aff', // Blue color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#448aff', // Blue color
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default StudentLoginPage;
