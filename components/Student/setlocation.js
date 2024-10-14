import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import * as Location from 'expo-location';
import { getDatabase, ref, push } from 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/database';
import TopBar from '../topbar';

// Initialize Firebase


const StudentSetHomeLocation = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { userId } = route.params;
console.log(userId)
  useEffect(() => {
    if (location) {
      setShowModal(true);
      setSuccessMessage('Location saved successfully!');
    }
  }, [location]);

  const closeSuccessModal = () => {
    setShowModal(false);
  };

  const getLocation = async () => {
    if (isLoading) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Location permission not granted');
        setIsLoading(false);
        return;
      }
  
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;
  
      const db = getDatabase();
      const locationRef = ref(db, `location_matches`);
      await push(locationRef, {
        student_id: userId, // Include the userId obtained from route.params
        stud_latitude: latitude,
        stud_longitude: longitude
      });
  
      setLocation({ latitude, longitude });
      console.log(latitude,longitude)
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <TopBar title="Set Location" />

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#448aff" />
        ) : (
          <>
            <Text style={styles.mainText}>Student Set Home Location</Text>
            {/* {location && (
              // <Text style={styles.mainText}>
              //   Latitude: {location.latitude}, Longitude: {location.longitude}
              // </Text>
            )} */}
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
            <TouchableOpacity
              style={styles.mainButton}
              onPress={getLocation}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Set Home Location</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{successMessage}</Text>
            <TouchableOpacity onPress={closeSuccessModal}>
              <Text style={{ color: '#0056b3', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 50,
    fontSize: 22,
    fontFamily: 'Poppins-Regular',

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Poppins-Bold',

    alignItems: 'center',
  },
  successMessage: {
    color: 'green',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    fontSize:25,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainText: {
    fontSize: 25,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',

  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    fontFamily: 'Poppins-Bold',
fontSize:25,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default StudentSetHomeLocation;
