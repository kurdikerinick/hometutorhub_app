import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../topbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const StudentHomeScreen = ({ route }) => {
  const { userId } = route.params;
  
  const navigation = useNavigation();

  const handleSyllabusPress = () => {
    navigation.navigate('TrackSyllabus', { userId });
  };

  const handleSetGeoLocationPress = () => {
    navigation.navigate('StudentSetHomeLocation', { userId });
  };

  const handleTestsPress = () => {
    navigation.navigate('MonitorTests', { userId });
  };

  const handleAttendanceListPress = () => {
    navigation.navigate('AttendanceList', { userId });
  };
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

  return (
    <View style={styles.container}>
      <TopBar title="Home" />
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleSetGeoLocationPress}>
          <MaterialCommunityIcons name="map-marker" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Set Geo-Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSyllabusPress}>
          <MaterialCommunityIcons name="book" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Track Syllabus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTestsPress}>
          <MaterialCommunityIcons name="monitor" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Monitor Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAttendanceListPress}>
          <MaterialCommunityIcons name="clipboard-check" size={40} color="#0058a3" />
          <Text style={styles.buttonText}>Attendance List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#0058a3',
    fontSize: 18,
    marginLeft: 15,
    fontFamily: 'Poppins-Bold',
  },
});

export default StudentHomeScreen;
