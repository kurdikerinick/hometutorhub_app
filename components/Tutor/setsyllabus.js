import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push } from 'firebase/database';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

export default function SetSyllabusScreen() {
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, studentId } = route.params;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../../assets/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/Poppins/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  const handleSetSyllabus = () => {
    if (!subject || !topics) {
      Alert.alert('Error', 'Please select a subject and enter topics');
    } else {
      const db = getDatabase();
      const syllabusRef = ref(db, 'syllabus');

      push(syllabusRef, {
        subject_topics: topics,
        subject_name: subject,
        student_id: studentId,
        tutor_id: userId,
      })
        .then(() => {
          console.log('Syllabus added successfully');
          setShowModal(true);
          setSuccessMessage('Syllabus added successfully!');
          setSubject('');
          setTopics('');
        })
        .catch((error) => {
          console.error('Error adding syllabus:', error);
          Alert.alert('Error', 'Failed to add syllabus');
        });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // navigation.navigate('syllabuscopy');
  };

  const handleMarkSyllabus = () => {
    navigation.navigate('syllabuscopy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Syllabus</Text>

      <Picker
        selectedValue={subject}
        style={styles.picker}
        onValueChange={(itemValue) => setSubject(itemValue)}
      >
        <Picker.Item label="Mathematics" value="Math" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Hindi" value="Hindi" />
        <Picker.Item label="Kannada" value="Kannada" />
        <Picker.Item label="Social Science" value="Social Science" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter Topics"
        value={topics}
        onChangeText={(text) => setTopics(text)}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSetSyllabus}>
        <Text style={styles.buttonText}>Update Syllabus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleMarkSyllabus}>
        <Text style={styles.buttonText}>Mark Syllabus</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{successMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    color: '#343a40',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#495057',
    fontFamily: 'Poppins-Regular', // Apply custom font here
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    backgroundColor: '#1b58a8',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular', // Apply custom font here
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', // Apply custom font here
  },
  modalButton: {
    backgroundColor: '#1b58a8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', // Apply custom font here
  },
});
