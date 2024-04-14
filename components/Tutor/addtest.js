import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { getDatabase, ref, push } from 'firebase/database';

export default function TutorAddTest() {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [marks, setMarks] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    // const navigation = useNavigation();
    const route = useRoute();
    const { userId, studentId } = route.params;

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
            />
            <TextInput
                style={styles.input}
                placeholder="Date (e.g., YYYY/MM/DD)"
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Marks Scored"
                onChangeText={(text) => setMarks(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Max Marks"
                onChangeText={(text) => setMaxMarks(text)}
            />
            <Button
                title="Submit Test"
                onPress={handleAddTest}
                style={styles.button}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <Pressable onPress={hideModal}>
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
    },
    picker: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        width: '80%',
        marginBottom: 10,
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#0056b3',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
