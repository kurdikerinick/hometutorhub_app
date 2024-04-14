import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const StudMenuScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId, studentId } = route.params;
    console.log('TutorID:', userId)
    // Log the studentId to check if it's being passed
    console.log('studentId:', studentId);

    const handleTutorAddTestPress = () => {
        navigation.navigate('TutorAddTest', { userId, studentId });
    };

    const handleSetSyllabusScreenPress = () => {
        navigation.navigate('SetSyllabusScreen', { userId, studentId });
    };

    const handleMessagePress = () => {
        // Handle the 'Message' button press here
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.highlight]}
                onPress={handleSetSyllabusScreenPress}
            >
                <Text style={styles.buttonText}>Set Syllabus</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.highlight]}
                onPress={handleTutorAddTestPress}
            >
                <Text style={styles.buttonText}>Tutor Add Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.highlight]}
                onPress={handleMessagePress}
            >
                <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#448aff', 
    },
    button: {
        backgroundColor: '#448aff', // Blue color
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    highlight: {
        backgroundColor: '#0058a3', // Darker blue color when pressed
    },
});

export default StudMenuScreen;
