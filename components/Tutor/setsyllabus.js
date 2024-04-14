import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Button,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push } from 'firebase/database';

export default function SetSyllabusScreen() {
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, studentId } = route.params; // Assuming userId corresponds to TutorID

  useEffect(() => {
    console.log('studentId:', studentId);
  }, []);

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
        tutor_id: userId // Assigning userId to tutor_id
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
        onChangeText={(text) => setTopics(text)}
      />

      <Button title="Set Syllabus" onPress={handleSetSyllabus} style={styles.button} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{successMessage}</Text>
            <Button title="OK" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
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
});
