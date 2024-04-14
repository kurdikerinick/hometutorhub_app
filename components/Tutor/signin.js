import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Location from 'expo-location';
import TopBar from '../topbar';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, set, get } from 'firebase/database';

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

  useEffect(() => {
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
        // Get reference to Firebase Realtime Database
        const db = getDatabase();
  
        // Log student ID before making the database query
        console.log('Student ID:', studentId);
  
        // Fetch the student's location from the database
        const studentLocationRef = ref(db, `location_matches/${studentId}`);
        console.log('Database Query Path:', studentLocationRef.toString());
        const studentLocationSnapshot = await get(studentLocationRef);
        console.log('Student location snapshot:', studentLocationSnapshot);

        // Log the student location snapshot
        console.log('Student location snapshot:', studentLocationSnapshot.val());
  
        // Check if studentLocationSnapshot contains any data
        if (!studentLocationSnapshot.exists()) {
          console.log('No data found for student location.');
          setModalText('Student location not found.');
          setModalVisible(true);
          return;
        }
  
        const studentLocation = studentLocationSnapshot.val();
        console.log('Student location:', studentLocation);
  
        // Calculate the distance between tutor and student
        const distanceInMeters = calculateDistance(
          studentLocation.stud_latitude,
          studentLocation.stud_longitude,
          latitude,
          longitude
        );
  
        // Check if the tutor is within 10 meters of the student
        if (distanceInMeters <= 10) {
          // Set sign-in data in the database
          const newSignInTimestamp = new Date().toISOString();
          const signInRef = ref(db, `location_matches/${studentId}`);
          await set(signInRef, {
            student_id: studentId,
            TutorID,
            tutor_latitude: latitude,
            tutor_longitude: longitude,
            sign_in_timestamp: newSignInTimestamp,
          });
  
          // Display success message
          setModalText(
            `Sign In Successful with Student ID: ${studentId} and Tutor ID: ${TutorID}`
          );
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
      // Get reference to Firebase Realtime Database
      const db = getDatabase();

      // Fetch sign-in timestamp from the database
      const signInRef = ref(db, `location_matches/${studentId}/sign_in_timestamp`);
      const signInSnapshot = await get(signInRef);
      const signInTimestamp = signInSnapshot.val();

      // Check if the student has signed in
      if (!signInTimestamp) {
        setModalText('Error. Student has not signed in yet.');
        setModalVisible(true);
        return;
      }

      // Set sign-out timestamp in the database
      const newSignOutTimestamp = new Date().toISOString();
      const signOutRef = ref(db, `location_matches/${studentId}`);
      await set(signOutRef, {
        sign_out_timestamp: newSignOutTimestamp,
      });

      // Display success message
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
      // Get reference to Firebase Realtime Database
      const db = getDatabase();

      // Update absence status in the database
      const absentRef = ref(db, `location_matches/${studentId}`);
      await set(absentRef, {
        remark: 'absent',
      });

      // Display success message
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

  return (
    <View style={styles.container}>
      <TopBar title="Set Location" />
      <View style={styles.container1}>
        <Text style={styles.title}>Student Sign In</Text>
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
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Out" onPress={handleSignOut} />
        <Button title="Absent" onPress={handleAbsent} />

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
  container1: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Button: {
    color: '#0058a3',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SignIn;
