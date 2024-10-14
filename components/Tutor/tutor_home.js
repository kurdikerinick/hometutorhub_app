import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from '../topbar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const TutorHomeScreen = ({ route }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
        try {
          await Font.loadAsync({
              'Poppins-Regular': require('../../assets/Poppins/Poppins-Regular.ttf'),
              'Poppins-Bold': require('../../assets/Poppins/Poppins-Bold.ttf'),
          });
          setFontsLoaded(true);
          SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
        } catch (error) {
          console.error('Error loading fonts:', error);
        }
    }
    loadFonts();
  }, []);

  // Show loading indicator if fonts are not loaded
  if (!fontsLoaded) {
    return null; // You can add a loading spinner or other indicator here if necessary
  }

  const navigation = useNavigation();
  const { userId } = route.params;

  const handleButtonPress = (screen) => {
    navigation.navigate(screen, { userId });
  };

  return (
    <View style={styles.container}>
      <TopBar title="Dashboard" />

      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleButtonPress('SignIn')}
        >
          <Icon name="sign-in" size={50} color="#0058a3" />
          <Text style={styles.cardText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleButtonPress('StudentListScreen')}
        >
          <Icon name="users" size={50} color="#0058a3" />
          <Text style={styles.cardText}>Students</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleButtonPress('TutorAddTest')}
        >
          <Icon name="gear" size={50} color="#0058a3" />
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Poppins-Bold', // Apply the Poppins-Bold font if you need to style the title

  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Bold', // Apply the Poppins-Bold font if you need to style the title

  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    fontFamily: 'Poppins-Bold', // Apply the Poppins-Bold font if you need to style the title

    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#0058a3',
    marginTop: 10,
    fontFamily: 'Poppins-Regular', // Ensure this matches the name used in Font.loadAsync
  },
  title: {
    fontFamily: 'Poppins-Bold', // Apply the Poppins-Bold font if you need to style the title
  },
});

export default TutorHomeScreen;
