import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Location from 'expo-location';
import TopBar from '../topbar';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, set, get } from 'firebase/database';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const SignIn = ({ navigation }) => {
  const route = useRoute();
  const [studentId, setStudentId] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { TutorID } = route.params;
  const [signInTimestamp, setSignInTimestamp] = useState(null);
  const [signOutTimestamp, setSignOutTimestamp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
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
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setModalText(
          'Location Permission Denied. Please grant location permission to check your location.'
        );
        setModalVisible(true);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setModalText('Error fetching location. Please try again.');
      setModalVisible(true);
    }
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }

  const handleSignIn = async () => {
    if (studentId.trim() === '') {
      setModalText('Invalid Input. Please enter a valid student ID.');
      setModalVisible(true);
    } else {
      try {
        const db = getDatabase();
        const studentLocationRef = ref(db, `location_matches/${studentId}`);
        const studentLocationSnapshot = await get(studentLocationRef);
        if (!studentLocationSnapshot.exists()) {
          setModalText('Student location not found.');
          setModalVisible(true);
          return;
        }
        const studentLocation = studentLocationSnapshot.val();
        const distanceInMeters = calculateDistance(
          studentLocation.stud_latitude,
          studentLocation.stud_longitude,
          latitude,
          longitude
        );
        if (distanceInMeters <= 10) {
          const newSignInTimestamp = new Date().toISOString();
          const signInRef = ref(db, `location_matches/${studentId}`);
          await set(signInRef, {
            student_id: studentId,
            TutorID,
            tutor_latitude: latitude,
            tutor_longitude: longitude,
            sign_in_timestamp: newSignInTimestamp,
          });
          setModalText(`Sign In Successful with Student ID: ${studentId} and Tutor ID: ${TutorID}`);
          setModalVisible(true);
        } else {
          setModalText('Tutor is more than 10 meters away from the student.');
          setModalVisible(true);
        }
      } catch (error) {
        console.error('Error signing in:', error);
        setModalText('Sign In Error. An error occurred while signing in.');
        setModalVisible(true);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const db = getDatabase();
      const signInRef = ref(db, `location_matches/${studentId}/sign_in_timestamp`);
      const signInSnapshot = await get(signInRef);
      const signInTimestamp = signInSnapshot.val();
      if (!signInTimestamp) {
        setModalText('Error. Student has not signed in yet.');
        setModalVisible(true);
        return;
      }
      const newSignOutTimestamp = new Date().toISOString();
      const signOutRef = ref(db, `location_matches/${studentId}`);
      await set(signOutRef, {
        sign_out_timestamp: newSignOutTimestamp,
      });
      setModalText(`Sign Out Successful for Student ID: ${studentId}`);
      setModalVisible(true);
    } catch (error) {
      console.error('Error signing out:', error);
      setModalText('Sign Out Error. An error occurred while signing out.');
      setModalVisible(true);
    }
  };

  const handleAbsent = async () => {
    try {
      const db = getDatabase();
      const absentRef = ref(db, `location_matches/${studentId}`);
      await set(absentRef, {
        remark: 'absent',
      });
      setModalText(`Marked Absent for Student ID: ${studentId}`);
      setModalVisible(true);
    } catch (error) {
      console.error('Error marking absent:', error);
      setModalText('Absent Marking Error. An error occurred while marking student absent.');
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (!fontsLoaded) {
    return null; // Add a loading spinner or other indicator if necessary
  }

  return (
    <View style={styles.container}>
      <TopBar title="Set Location" />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Student Sign-In</Text>
        <Text style={styles.locationText}>
          Latitude: {latitude}, Longitude: {longitude}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          onChangeText={(text) => setStudentId(text)}
          value={studentId}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAbsent}>
          <Text style={styles.buttonText}>Absent</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Pressable onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#333',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#1b58a8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    color: '#333',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1b58a8',
  },
});

export default SignIn;
