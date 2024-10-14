import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getDatabase, ref, push } from 'firebase/database';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TutorAddTest() {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [marks, setMarks] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const route = useRoute();
    const { userId, studentId } = route.params;

    // Load fonts
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

    // Show loading indicator if fonts are not loaded
    if (!fontsLoaded) {
        return null; // You can add a loading spinner or other indicator here if necessary
    }

    const showModal = (text) => {
        setModalText(text);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleAddTest = () => {
        if (!topic || !date || !marks || !maxMarks) {
            showModal('Validation Error', 'All fields are required.');
            return;
        }

        const db = getDatabase();
        const testsRef = ref(db, 'tests');

        push(testsRef, {
            topic,
            date,
            marks,
            maxMarks,
            subject_name: subject,
            studentId,
            TutorID: userId // Assigning userId to TutorID
        })
            .then(() => {
                showModal('Test added Successfully', 'Test added successfully');
            })
            .catch((error) => {
                console.error('Error adding test:', error);
                showModal('Error adding test', 'Failed to add the test. Please try again.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Test</Text>

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
                placeholder="Test Topic"
                onChangeText={(text) => setTopic(text)}
                placeholderTextColor="#6c757d"
            />
            <TextInput
                style={styles.input}
                placeholder="Date (e.g., YYYY/MM/DD)"
                onChangeText={(text) => setDate(text)}
                placeholderTextColor="#6c757d"
            />
            <TextInput
                style={styles.input}
                placeholder="Marks Scored"
                onChangeText={(text) => setMarks(text)}
                placeholderTextColor="#6c757d"
            />
            <TextInput
                style={styles.input}
                placeholder="Max Marks"
                onChangeText={(text) => setMaxMarks(text)}
                placeholderTextColor="#6c757d"
            />
            <Pressable
                style={styles.button}
                onPress={handleAddTest}
            >
                <Text style={styles.buttonText}>Submit Test</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Pressable style={styles.modalButton} onPress={hideModal}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
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
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
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
    header: {
        fontSize: 28,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold',
        color: '#343a40',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#495057',
        fontFamily: 'Poppins-Regular',
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#1b58a8',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
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
        fontFamily: 'Poppins-Bold',
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
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
    },
    modalButton: {
        backgroundColor: '#1b58a8',
        paddingVertical: 10,
        paddingHorizontal: 20,
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
        fontFamily: 'Poppins-Bold',
    },
});
